import {useEffect, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";

import {Project} from "../../models/project";
import {fetchProjectData} from "../../controllers/project.controller.tsx";
import {ProjectTable} from "../../components/ProjectTable.tsx";
import {useNavigate} from "react-router-dom";

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<Project>>([]);

  const updateProjectList = async () => {
    await fetchProjectData('/api/v1', -1, setProjects);
  };

  useEffect(() => {
    void updateProjectList();
  }, []);

  return (
    <div className="project">
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="12" xl="9">
            <h1 className="page-title">Projects</h1>
            <Table className="project__list align-middle" bordered>
              <thead>
                <ProjectTable.Header />
              </thead>
              <tbody>
                {
                  projects.map(project =>
                    <ProjectTable
                      key={project.id}
                      projectData={project}
                      onClick={() => navigate(`/project/${project.id}`)}
                    />)
                }
              </tbody>
            </Table>
            {
              (+(sessionStorage.getItem('isLoggedIn') ?? 0))
                ? <Button variant="primary" onClick={() => navigate(`/project/create`)}>New Project</Button>
                : <></>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {Projects};
