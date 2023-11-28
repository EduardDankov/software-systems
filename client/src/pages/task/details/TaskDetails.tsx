import {useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

import {fetchTaskData} from "../../../controllers/task.controller";
import {TaskTable} from "../../../components/TaskTable";
import {User} from "../../../models/user";
import {Task} from "../../../models/task";
import {Menu} from "../../../components/Menu";

function TaskDetails() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const userData: User = JSON.parse(sessionStorage.getItem("userData") || "{}");
  const {taskId} = useParams();

  if (taskId === undefined || +taskId < 1) {
    navigate('/task');
  }

  const updateTaskList = async () => {
    await fetchTaskData('/api/v1', +taskId!, setTasks);
  };

  const editTaskData = () => {
    navigate(`/task/${taskId}/edit`);
  }

  Promise.all([
    updateTaskList()
  ]).then(() => setIsDataLoaded(true));

  return (
    <div className="task-details">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="12" xl="9">
            <h1 className="page-title">Task #{taskId}</h1>
            <Table className="align-middle" bordered>
              <thead>
                <TaskTable.Header />
              </thead>
              <tbody>
              {
                isDataLoaded
                ? tasks.map(task =>
                    <TaskTable key={taskId} taskData={task} />
                  )
                : <>Loading...</>
              }
              </tbody>
            </Table>
            {
              isDataLoaded
                ? tasks.map(task =>
                  (userData.id && (task.assignee.id === userData.id || task.project.manager.id === userData.id))
                    ? <>
                        <Button
                          key={(+taskId! || 0) + 100}
                          variant="primary"
                          onClick={editTaskData}
                        >Edit Data</Button>
                        <Button
                          key={(+taskId! || 0) + 101}
                          variant="danger"
                          onClick={() => navigate(`/task/delete/${taskId}`)}
                        >Delete Task</Button>
                      </>
                    : <></>
                )
              : <></>
            }
            <Button variant="secondary" onClick={() => navigate(`/task`)}>Back</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {TaskDetails};
