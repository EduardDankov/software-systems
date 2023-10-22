import './App.scss';
import axios, {AxiosResponse} from "axios";
import {useState} from "react";
import {Button, Table} from "react-bootstrap";

function App() {
  const [userCount, setUserCount] = useState(-1);
  const [projectCount, setProjectCount] = useState(-1);
  const [taskCount, setTaskCount] = useState(-1);
  const [fileCount, setFileCount] = useState(-1);
  const [bugReportCount, setBugReportCount] = useState(-1);
  const [messageCount, setMessageCount] = useState(-1);
  const urlProxy: string = "/api/v1";

  function getUserCount() {
    axios
      .get(`${urlProxy}/user/count`)
      .then((res: AxiosResponse) => setUserCount(res.data))
      .catch((err) => {
        console.error(err);
      });
  }
  function getProjectCount() {
    axios
      .get(`${urlProxy}/project/count`)
      .then((res: AxiosResponse) => setProjectCount(res.data))
      .catch((err) => {
        console.error(err);
      });
  }
  function getTaskCount() {
    axios
      .get(`${urlProxy}/task/count`)
      .then((res: AxiosResponse) => setTaskCount(res.data))
      .catch((err) => {
        console.error(err);
      });
  }
  function getFileCount() {
    axios
      .get(`${urlProxy}/file/count`)
      .then((res: AxiosResponse) => setFileCount(res.data))
      .catch((err) => {
        console.error(err);
      });
  }
  function getBugReportCount() {
    axios
      .get(`${urlProxy}/bug-report/count`)
      .then((res: AxiosResponse) => setBugReportCount(res.data))
      .catch((err) => {
        console.error(err);
      });
  }
  function getMessageCount() {
    axios
      .get(`${urlProxy}/message/count`)
      .then((res: AxiosResponse) => setMessageCount(res.data))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Table className="greeting align-middle" bordered>
      <thead>
        <tr>
          <th>Entity</th>
          <th>Count</th>
          <th>Sync</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>Users</td>
        <td>{userCount}</td>
        <td>
          <Button
            onClick={getUserCount}
            className="user-count-button"
          >Update</Button>
        </td>
      </tr>
      <tr>
        <td>Projects</td>
        <td>{projectCount}</td>
        <td>
          <Button
            onClick={getProjectCount}
            className="project-count-button"
          >Update</Button>
        </td>
      </tr>
      <tr>
        <td>Tasks</td>
        <td>{taskCount}</td>
        <td>
          <Button
            onClick={getTaskCount}
            className="task-count-button"
          >Update</Button>
        </td>
      </tr>
      <tr>
        <td>Files</td>
        <td>{fileCount}</td>
        <td>
          <Button
            onClick={getFileCount}
            className="file-count-button"
          >Update</Button>
        </td>
      </tr>
      <tr>
        <td>Bug Reports</td>
        <td>{bugReportCount}</td>
        <td>
          <Button
            onClick={getBugReportCount}
            className="bug-report-count-button"
          >Update</Button>
        </td>
      </tr>
      <tr>
        <td>Messages</td>
        <td>{messageCount}</td>
        <td>
          <Button
            onClick={getMessageCount}
            className="message-count-button"
          >Update</Button>
        </td>
      </tr>
      </tbody>
    </Table>
  );
}

export { App };
