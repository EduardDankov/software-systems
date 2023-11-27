import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {User} from "../../models/user";
import {fetchIsEmailTaken, fetchUpdateUser} from "../../controllers/user.controller.tsx";

function UserCabinet() {
  const navigate = useNavigate();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({ mode: "onChange" });

  // eslint-disable-next-line no-control-regex
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");

  useEffect(() => {
    if (!+(sessionStorage.getItem('isLoggedIn') ?? 0)) {
      navigate('/user/login');
    }
  }, [navigate]);

  const changeData = async (data: FieldValues) => {
    if (userData.username !== data?.username) {
      await fetchUpdateUser('/api/v1', userData.id, 'username', data?.username)
        .then((res: boolean) => {
          if (res) {
            setIsDataChanged(true);
            sessionStorage.setItem("userData", JSON.stringify({...userData, username: data?.username}));
          }
        });
    }
    if (userData.email !== data?.email) {
      await fetchIsEmailTaken('/api/v1', data?.email, setIsEmailTaken)
        .then(async (emailRes: boolean) => {
          if (!emailRes) {
            await fetchUpdateUser('/api/v1', userData.id, 'email', data?.email)
              .then((res: boolean) => {
                if (res) {
                  setIsDataChanged(true);
                  navigate('/user/logout');
                }
              });
          }
        })
    }
    if (data?.password !== '') {
      await fetchUpdateUser('/api/v1', userData.id, 'password', data?.password)
        .then((res: boolean) => {
          if (res) {
            setIsDataChanged(true);
            navigate('/user/logout');
          }
        });
    }
  }

  return (
    <div className="user">
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form onSubmit={handleSubmit(changeData)}>
              <h1 className="page-title">Cabinet</h1>
              {
                isDataChanged
                  ? <p className="text-success">Data changed successfully.</p>
                  : <p className="text-muted">
                    You can change your data. After you change your email or password, you will have to log in again.
                  </p>
              }
              <Form.Group className="mb-3" controlId="controlUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  defaultValue={userData.username}
                  { ...register("username", {required: true}) }
                  aria-invalid={errors.username ? "true" : undefined}
                />
                {
                  errors.username
                    ? (
                      errors.username.type === "required"
                      && <Form.Text className="text-danger">This field is required.</Form.Text>
                    )
                    : <Form.Text className="text-muted">
                      The username is used to identify you in the system.
                    </Form.Text>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="controlEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="user@mail.com"
                  defaultValue={userData.email}
                  { ...register("email", {required: true, pattern: emailRegex}) }
                  aria-invalid={errors.email ? "true" : undefined}
                />
                {
                  isEmailTaken
                    ? <Form.Text className="text-danger">This email is already taken.</Form.Text>
                    : errors.email
                      ? (
                        errors.email.type === "required"
                          ? <Form.Text className="text-danger">This field is required.</Form.Text>
                          : errors.email.type === "pattern"
                          && <Form.Text className="text-danger">Entered string is not a valid email address.</Form.Text>
                      )
                      : <Form.Text className="text-muted">
                        Your email address is used to log you in.
                      </Form.Text>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="controlPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  { ...register("password") }
                />
                {
                  <Form.Text className="text-muted">
                    You can enter another password if you wish to change it.
                  </Form.Text>
                }
              </Form.Group>
              <Button variant="primary" type="submit">Save</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {UserCabinet};
