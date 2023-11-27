import {useEffect, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

import {Project} from "../../../models/project";
import {fetchProjectData} from "../../../controllers/project.controller";
import {ProjectTable} from "../../../components/ProjectTable";

function ProjectDetails() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<Project>>([]);

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
                {projects.length > 0 && <ProjectTable key={projectId} projectData={projects[0]} />}
              </tbody>
            </Table>
            <Button onClick={editProjectData}>Edit Data</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {ProjectDetails};
