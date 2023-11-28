import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import {Project} from "../../../../models/project";
import {fetchProjectData, fetchProjectUpdate} from "../../../../controllers/project.controller";
import {User} from "../../../../models/user";
import {Menu} from "../../../../components/Menu";

function ProjectEdit() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({ mode: "onChange" });

  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const {projectId} = useParams();

  if (projectId === undefined || +projectId < 1) {
    navigate('/project');
  }

  const updateProjectList = async () => {
    await fetchProjectData('/api/v1', +projectId!, setProjects);
  };

  void Promise.all([
    updateProjectList()
  ]).then(() => setIsDataLoaded(true));

  useEffect(() => {
    if (isDataChanged) {
      navigate(`/project/${projectId}`)
    }
  }, [isDataChanged]);

  const changeData = async (data: FieldValues) => {
    if (!userData.id || projects[0].manager.id !== userData.id) {
      window.reportError(new Error("You cannot edit this project."));
    } else {
      if (projects[0].name !== data?.projectName) {
        await fetchProjectUpdate('/api/v1', +projectId!, 'project_name', data?.projectName)
          .then((res: boolean) => {
            if (res) {
              setIsDataChanged(true);
            }
          });
      }
      if (projects[0].description !== data?.projectDescription) {
        await fetchProjectUpdate('/api/v1', +projectId!, 'project_description', data?.projectDescription)
          .then((res: boolean) => {
            if (res) {
              setIsDataChanged(true);
            }
          });
      }
    }
  }

  return(
    <div className="project-edit">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            {
              isDataLoaded
              ? projects.map(project =>
                <Form key={projectId} onSubmit={handleSubmit(changeData)}>
                  <h1 className="page-title">Edit Project #{projectId}</h1>
                  {
                    isDataChanged
                      ? <p className="text-success">Data changed successfully.</p>
                      : <p className="text-muted">
                        You can change the project data if necessary.
                      </p>
                  }
                  <Form.Group className="mb-3" controlId="controlProjectName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Untitled"
                      defaultValue={project.name}
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
                      defaultValue={project.description}
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
                  <Button variant="primary" type="submit">Save</Button>
                  <Button variant="secondary" onClick={() => navigate(`/project/${projectId}`)}>Back</Button>
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

export {ProjectEdit};
