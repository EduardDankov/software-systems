import {useEffect, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

import {Project} from "../../../models/project";
import {fetchProjectData} from "../../../controllers/project.controller";
import {ProjectTable} from "../../../components/ProjectTable";
import {User} from "../../../models/user.tsx";

function ProjectDetails() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<Project>>([]);

  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const {projectId} = useParams();

  if (projectId === undefined || +projectId < 1) {
    navigate('/project');
  }

  const updateProjectList = async () => {
    await fetchProjectData('/api/v1', +projectId!, setProjects);
  };

  const editProjectData = () => {
    navigate(`/project/${projectId}/edit`);
  }

  useEffect(() => {
    void updateProjectList();
  }, []);

  return (
    <div className="project-details">
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="12" xl="9">
            <h1 className="page-title">Project #{projectId}</h1>
            <Table className="align-middle" bordered>
              <thead>
              <ProjectTable.Header />
              </thead>
              <tbody>
              {
                projects.map(project =>
                  <ProjectTable key={projectId} projectData={project} />
                )
              }
              </tbody>
            </Table>
            {
              projects.map(project =>
                (userData.id && project.manager.id === userData.id)
                  && <Button
                        key={projectId}
                        variant="primary"
                        onClick={editProjectData}
                     >Edit Data</Button>
              )
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {ProjectDetails};
