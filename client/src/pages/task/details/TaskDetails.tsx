import {useEffect, useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

import {fetchTaskData} from "../../../controllers/task.controller";
import {TaskTable} from "../../../components/TaskTable";
import {User} from "../../../models/user";
import {Task} from "../../../models/task";

function TaskDetails() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Array<Task>>([]);

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

  useEffect(() => {
    void updateTaskList();
  }, []);

  return (
    <div className="task-details">
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
                tasks.map(task =>
                  <TaskTable key={taskId} taskData={task} />
                )
              }
              </tbody>
            </Table>
            {
              tasks.map(task =>
                (userData.id && (task.assignee.id === userData.id || task.project.manager.id === userData.id))
                  ? <Button
                    key={taskId}
                    variant="primary"
                    onClick={editTaskData}
                  >Edit Data</Button>
                  : <></>
              )
            }
            <Button variant="secondary" onClick={() => navigate(`/task`)}>Back</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {TaskDetails};
