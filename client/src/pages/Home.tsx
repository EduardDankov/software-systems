// Libraries
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";

// Components
import {EntityCount} from "../components/EntityCount";
import {ErrorModal} from "../components/ErrorModal";

// Controllers
import {fetchUserCount} from "../controllers/user.controller";
import {fetchProjectCount} from "../controllers/project.controller";
import {fetchTaskCount} from "../controllers/task.controller";
import {fetchFileCount} from "../controllers/file.controller";
import {fetchBugReportCount} from "../controllers/bugReport.controller";
import {fetchMessageCount} from "../controllers/message.controller";

function Home() {
  const urlProxy: string = "/api/v1";

  const [isError, setIsError] = useState(false);

  const [userCount, setUserCount] = useState(-1);
  const [projectCount, setProjectCount] = useState(-1);
  const [taskCount, setTaskCount] = useState(-1);
  const [fileCount, setFileCount] = useState(-1);
  const [bugReportCount, setBugReportCount] = useState(-1);
  const [messageCount, setMessageCount] = useState(-1);

  useEffect(() => {
    fetchUserCount(urlProxy, setUserCount);
    fetchProjectCount(urlProxy, setProjectCount);
    fetchTaskCount(urlProxy, setTaskCount);
    fetchFileCount(urlProxy, setFileCount);
    fetchBugReportCount(urlProxy, setBugReportCount);
    fetchMessageCount(urlProxy, setMessageCount);
  }, []);

  return (
    <>
      <ErrorModal show={isError} onHide={() => setIsError(false)} />
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
        <EntityCount
          entity="File"
          count={fileCount}
          onClick={() => fetchFileCount(urlProxy, setFileCount)}
        />
        <EntityCount
          entity="Bug Report"
          count={bugReportCount}
          onClick={() => fetchBugReportCount(urlProxy, setBugReportCount)}
        />
        <EntityCount
          entity="Message"
          count={messageCount}
          onClick={() => fetchMessageCount(urlProxy, setMessageCount)}
        />
        </tbody>
      </Table>
    </>
  );
}

export {Home};
