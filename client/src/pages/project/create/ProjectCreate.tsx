import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";

import {User} from "../../../models/user";
import {fetchProjectCreate} from "../../../controllers/project.controller.tsx";

function ProjectCreate() {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState(-1);
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({ mode: "onChange" });

  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");

  const handleCreation = async (data: FieldValues) => {
    if (!userData.id) {
      window.reportError(new Error("You have to log in to create a project."));
    } else {
      await fetchProjectCreate('/api/v1', data?.projectName, data?.projectDescription, userData.id, setProjectId);
    }
  }

  useEffect(() => {
    if (projectId !== -1) {
      navigate(`/project`);
    }
  }, [projectId]);

  return (
    <div className="project-create">
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form onSubmit={handleSubmit(handleCreation)}>
              <h1 className="page-title">Create a Project</h1>
              <Form.Group className="mb-3" controlId="controlProjectName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Untitled"
                  { ...register("projectName", {required: true}) }
                  aria-invalid={errors.projectName ? "true" : undefined}
                />
                {
                  errors.projectName
                    ? (
                      errors.projectName.type === "required"
                      && <Form.Text className="text-danger">This field is required.</Form.Text>
                    )
                    : <Form.Text className="text-muted">
                      The project name is used to identify it in the system.
                    </Form.Text>
                }
              </Form.Group>
              <Form.Group className="mb-3" controlId="controlProjectDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="A description"
                  { ...register("projectDescription", {required: true}) }
                  aria-invalid={errors.projectDescription ? "true" : undefined}
                />
                {
                  errors.projectDescription
                    ? (
                      errors.projectDescription.type === "required"
                      && <Form.Text className="text-danger">This field is required.</Form.Text>
                    )
                    : <Form.Text className="text-muted">
                      The project description helps to understand the purpose of the project.
                    </Form.Text>
                }
              </Form.Group>
              <Button variant="primary" type="submit">Create</Button>
              <Button variant="secondary" onClick={() => navigate(`/project`)}>Back</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {ProjectCreate};
