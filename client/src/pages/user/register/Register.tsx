import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {fetchUserRegister} from "../../../controllers/user.controller";
import {Menu} from "../../../components/Menu";

type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

function Register() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({ mode: "onChange" });

  // eslint-disable-next-line no-control-regex
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;

  const handleRegister = async (data: FieldValues) =>
    fetchUserRegister('/api/v1', data as RegisterCredentials, setIsRegistered, {
      emailTaken: setIsEmailTaken
    });

  useEffect(() => {
    if (isRegistered) {
      navigate('/user/login');
    }
  }, [isRegistered, navigate]);

  useEffect(() => {
    if (+(sessionStorage.getItem('isLoggedIn') ?? 0)) {
      navigate('/user');
    }
  }, [navigate]);

  return (
    <div className="user-register">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form onSubmit={handleSubmit(handleRegister)}>
              <h1 className="page-title">Register</h1>
              <Form.Group className="mb-3" controlId="controlUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
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
                      Create your username. It will be used to identify you in the system.
                    </Form.Text>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="controlEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="user@mail.com"
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
                        Enter your email address. It will be used to log you in.
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
                      Create your password.
                    </Form.Text>
                }
              </Form.Group>
              <Button variant="primary" type="submit">Register</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {Register};
export type {RegisterCredentials};
