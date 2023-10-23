import './App.scss';
import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {EntityCount} from "./components/EntityCount.tsx";

function App() {
  const urlProxy: string = "/api/v1";

  const [userCount, setUserCount] = useState(-1);
  const [projectCount, setProjectCount] = useState(-1);
  const [taskCount, setTaskCount] = useState(-1);
  const [fileCount, setFileCount] = useState(-1);
  const [bugReportCount, setBugReportCount] = useState(-1);
  const [messageCount, setMessageCount] = useState(-1);

  useEffect(() => {
    getUserCount();
    getProjectCount();
    getTaskCount();
    getFileCount();
    getBugReportCount();
    getMessageCount();
  }, []);

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
        <EntityCount.Header />
      </thead>
      <tbody>
        <EntityCount entity="User" count={userCount} onClick={getUserCount} />
        <EntityCount entity="Project" count={projectCount} onClick={getProjectCount} />
        <EntityCount entity="Task" count={taskCount} onClick={getTaskCount} />
        <EntityCount entity="File" count={fileCount} onClick={getFileCount} />
        <EntityCount entity="Bug Report" count={bugReportCount} onClick={getBugReportCount} />
        <EntityCount entity="Message" count={messageCount} onClick={getMessageCount} />
      </tbody>
    </Table>
  );
}

export { App };
