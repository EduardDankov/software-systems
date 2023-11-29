import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";

import {User} from "../../../../models/user";
import {Project} from "../../../../models/project";
import {fetchProjectData, fetchProjectDelete} from "../../../../controllers/project.controller";
import {Menu} from "../../../../components/Menu";

function ProjectDelete() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [isProjectDeleted, setIsProjectDeleted] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);const {
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
    await Promise.all([
      fetchProjectData('/api/v1', +projectId!, setProjects)
    ]).then(() => setIsDataLoaded(true));
  };

  Promise.all([
    updateProjectList()
  ]).then(() => setIsDataLoaded(true));

  useEffect(() => {
    if (isProjectDeleted) {
      navigate(`/project`)
    }
  }, [isProjectDeleted]);

  const deleteProject = async () => {
    if (!userData.id || projects[0].manager.id !== userData.id) {
      window.reportError(new Error("You cannot delete this project."));
    } else {
      await fetchProjectDelete('/api/v1', +projectId!)
        .then((res: boolean) => {
          if (res) {
            setIsProjectDeleted(true);
          }
        });
    }
  }

  return (
    <div className="project-delete">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            {
              isDataLoaded
                ? projects.map(project =>
                  <Form key={projectId} onSubmit={handleSubmit(deleteProject)}>
                    <h1 className="page-title">Delete Project #{projectId}</h1>
                    {
                      isProjectDeleted
                        ? <p className="text-success">Project deleted successfully.</p>
                        : <p className="text-muted">
                          You can delete the project if necessary.
                          Be careful, this action is not reversible!
                          All project's tasks will also be deleted!
                          You might want to <Link to={`/project/${projectId}`}>
                            move them to another project
                        </Link>.
                        </p>
                    }
                    <Form.Group className="mb-3" controlId="controlProjectName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Project Name"
                        { ...register("projectName", {
                            required: true,
                            validate: (value) => value === project.name
                          })}
                        aria-invalid={errors.projectName ? "true" : undefined}
                      />
                      {
                        errors.projectName
                          ? (
                            errors.projectName.type === "required"
                            ? <Form.Text className="text-danger">This field is required.</Form.Text>
                            : errors.projectName.type === "validate"
                            && <Form.Text className="text-danger">
                                The entered value is not equal to project's name.
                               </Form.Text>
                          )
                          : <Form.Text className="text-muted">
                              Enter the project name to confirm its deletion.
                            </Form.Text>
                      }
                    </Form.Group>
                    <Button variant="danger" type="submit">Delete</Button>
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

export {ProjectDelete};
