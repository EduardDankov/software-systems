import {useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

import {fetchProjectData} from "../../../controllers/project.controller";
import {fetchTaskDataByProject} from "../../../controllers/task.controller";
import {ProjectTable} from "../../../components/ProjectTable";
import { TaskTable } from "../../../components/TaskTable";
import {Project} from "../../../models/project";
import {User} from "../../../models/user";
import {Task} from "../../../models/task";

function ProjectDetails() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const {projectId} = useParams();

  if (projectId === undefined || +projectId < 1) {
    navigate('/project');
  }

  const updateProjectList = async () => {
    await fetchProjectData('/api/v1', +projectId!, setProjects);
  };

  const updateTaskList = async () => {
    await fetchTaskDataByProject('/api/v1', +projectId!, setTasks);
  }

  const editProjectData = () => {
    navigate(`/project/${projectId}/edit`);
  }

  Promise.all([
    void updateProjectList(),
    void updateTaskList()
  ]).then(() => setIsDataLoaded(true));

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
                isDataLoaded
                ? projects.map(project =>
                    <ProjectTable key={projectId} projectData={project} />
                  )
                : <></>
              }
              </tbody>
            </Table>
            {
              isDataLoaded
                ? projects.map(project =>
                  (userData.id && project.manager.id === userData.id)
                    ? <Button
                          key={projectId}
                          variant="primary"
                          onClick={editProjectData}
                       >Edit Data</Button>
                    : <></>
                  ) : <></>
            }
            <Button variant="secondary" onClick={() => navigate(`/project`)}>Back</Button>

            <Table className="align-middle" bordered>
              <thead>
                <TaskTable.Header />
              </thead>
              <tbody>
              {
                tasks.map(task =>
                  <TaskTable
                    key={task.id}
                    taskData={task}
                    onClick={() => navigate(`/task/${task.id}`)}
                  />
                )
              }
              </tbody>
            </Table>
            {
              projects.map(project =>
                (userData.id && project.manager.id === userData.id)
                ? <Button variant="primary" onClick={() => navigate(`/task/create`)}>New Task</Button>
                : <></>
              )
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {ProjectDetails};
