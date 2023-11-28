import {FieldValues, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {fetchUserLogin} from "../../../controllers/user.controller";
import {User} from "../../../models/user";
import {Menu} from "../../../components/Menu";

type LogInCredentials = {
  email: string;
  password: string;
};

function LogIn() {
  const navigate = useNavigate();
  const [isDataCorrect, setIsDataCorrect] = useState(false);
  const [userData, setUserData] = useState<User>({
    id: -1,
    username: "Anonymous",
    email: "Unknown"
  });
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({ mode: "onChange" });

  // eslint-disable-next-line no-control-regex
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

  const handleLogin = (data: FieldValues) =>
    fetchUserLogin('/api/v1', data as LogInCredentials, setIsDataCorrect, setUserData);

  useEffect(() => {
    if (isDataCorrect) {
      console.log(userData)
      sessionStorage.setItem('isLoggedIn', "1");
      sessionStorage.setItem('userData', JSON.stringify(userData));
      navigate('/user');
    }
  }, [isDataCorrect, navigate]);

  useEffect(() => {
    if (+(sessionStorage.getItem('isLoggedIn') ?? 0)) {
      navigate('/user');
    }
  }, [navigate]);

  return (
    <div className="user-login">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form onSubmit={handleSubmit(handleLogin)}>
              <h1 className="page-title">Log In</h1>
              <Form.Group className="mb-3" controlId="controlEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="user@mail.com"
                  { ...register("email", {required: true, pattern: emailRegex}) }
                  aria-invalid={errors.email ? "true" : undefined}
                />
                {
                  errors.email
                    ? (
                      errors.email.type === "required"
                        ? <Form.Text className="text-danger">This field is required.</Form.Text>
                        : errors.email.type === "pattern"
                        && <Form.Text className="text-danger">Entered string is not a valid email address.</Form.Text>
                    )
                    : <Form.Text className="text-muted">
                        Enter the email address used for registration.
                      </Form.Text>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="controlPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Your password"
                  { ...register("password", {required: true}) }
                  aria-invalid={errors.password ? "true" : undefined}
                />
                {
                  errors.password
                    ? <Form.Text className="text-danger">This field is required.</Form.Text>
                    : <Form.Text className="text-muted">
                      Enter the password used for registration.
                    </Form.Text>
                }
              </Form.Group>
              <Button variant="primary" type="submit">Log In</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { LogIn };
export type { LogInCredentials };
