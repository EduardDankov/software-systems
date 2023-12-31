import {useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

import {TaskTable} from "../../components/TaskTable";
import {fetchTaskData} from "../../controllers/task.controller";
import {Task} from "../../models/task";
import {Menu} from "../../components/Menu";

function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const updateTaskList = async () => {
    await fetchTaskData('/api/v1', -1, setTasks);
  };

  Promise.all([
    updateTaskList()
  ]).then(() => setIsDataLoaded(true));

  return (
    <div className="task">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="12" xl="9">
            <h1 className="page-title">Tasks</h1>
            <Table className="task__list align-middle" bordered>
              <thead>
                <TaskTable.Header />
              </thead>
              <tbody>
              {
                isDataLoaded
                ? tasks
                    .sort((a: Task, b: Task) => a.deadline > b.deadline ? 1 : -1)
                    .map(task =>
                    <TaskTable
                      key={task.id}
                      taskData={task}
                      onClick={() => navigate(`/task/${task.id}`)}
                    />)
                : <>Loading...</>
              }
              </tbody>
            </Table>
            {
              (+(sessionStorage.getItem('isLoggedIn') ?? 0))
                ? <Button variant="primary" onClick={() => navigate(`/task/create`)}>New Task</Button>
                : <></>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {Tasks};
