import './Home.scss';

// Libraries
import {useState} from "react";
import {Col, Container, Row, Table} from "react-bootstrap";

// Components
import {EntityCount} from "../components/EntityCount";
import {Menu} from "../components/Menu";

// Controllers
import {fetchUserCount} from "../controllers/user.controller";
import {fetchProjectCount} from "../controllers/project.controller";
import {fetchTaskCount} from "../controllers/task.controller";

function Home() {
  const urlProxy: string = "/api/v1";

  const [userCount, setUserCount] = useState(-1);
  const [projectCount, setProjectCount] = useState(-1);
  const [taskCount, setTaskCount] = useState(-1);

  void Promise.all([
    fetchUserCount(urlProxy, setUserCount),
    fetchProjectCount(urlProxy, setProjectCount),
    fetchTaskCount(urlProxy, setTaskCount)
  ]);

  return (
    <div className="home">
      <Menu />
      <Container className="container-md">
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <h1 className="page-title">Software Systems</h1>
            <Table className="greeting align-middle" bordered>
              <thead>
                <EntityCount.Header />
              </thead>
              <tbody>
                <EntityCount
                  entity="User"
                  count={userCount}
                  onClick={() => fetchUserCount(urlProxy, setUserCount)}
                />
                <EntityCount
                  entity="Project"
                  count={projectCount}
                  onClick={() => fetchProjectCount(urlProxy, setProjectCount)}
                />
                <EntityCount
                  entity="Task"
                  count={taskCount}
                  onClick={() => fetchTaskCount(urlProxy, setTaskCount)}
                />
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export {Home};
