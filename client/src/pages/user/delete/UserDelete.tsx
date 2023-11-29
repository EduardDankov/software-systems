import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";

import {fetchUserData, fetchUserDelete} from "../../../controllers/user.controller";
import {User} from "../../../models/user";
import {Menu} from "../../../components/Menu";

function UserDelete() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<Array<User>>([]);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({ mode: "onChange" });

  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const {userId} = useParams();

  if (userId === undefined || +userId < 1) {
    navigate('/user');
  }

  const updateUserList = async () => {
    await Promise.all([
      fetchUserData('/api/v1', +userId!, setUsers)
    ]).then(() => setIsDataLoaded(true));
  };

  Promise.all([
    updateUserList()
  ]).then(() => setIsDataLoaded(true));

  useEffect(() => {
    if (isUserDeleted) {
      navigate(`/user/logout`)
    }
  }, [isUserDeleted]);

  const deleteUser = async () => {
    if (!userData.id || users[0].id !== userData.id) {
      window.reportError(new Error("You cannot delete this user."));
    } else {
      await fetchUserDelete('/api/v1', +userId!)
        .then((res: boolean) => {
          if (res) {
            setIsUserDeleted(true);
          }
        });
    }
  }

  return (
    <div className="user-delete">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            {
              isDataLoaded
                ? users.map(user =>
                  <Form key={userId} onSubmit={handleSubmit(deleteUser)}>
                    <h1 className="page-title">Delete User #{userId}</h1>
                    {
                      isUserDeleted
                        ? <p className="text-success">User deleted successfully.</p>
                        : <p className="text-muted">
                          You can delete your account if necessary.
                          Be careful, this action is not reversible!
                          All your projects will also be deleted!
                          You might want to <Link to={`/project`}>
                            reassign them to another user
                          </Link>.
                        </p>
                    }
                    <Form.Group className="mb-3" controlId="controlUserName">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Your username"
                        { ...register("userName", {
                            required: true,
                            validate: (value) => value === user.username
                          })}
                        aria-invalid={errors.userName ? "true" : undefined}
                      />
                      {
                        errors.userName
                          ? (
                            errors.userName.type === "required"
                            ? <Form.Text className="text-danger">This field is required.</Form.Text>
                            : errors.userName.type === "validate"
                            && <Form.Text className="text-danger">
                                The entered value is not equal to your username.
                               </Form.Text>
                          )
                          : <Form.Text className="text-muted">
                              Enter your username to confirm the profile deletion.
                            </Form.Text>
                      }
                    </Form.Group>
                    <Button variant="danger" type="submit">Delete</Button>
                    <Button variant="secondary" onClick={() => navigate(`/user`)}>Back</Button>
                  </Form>
                )
                : <>Loading...</>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {UserDelete};
