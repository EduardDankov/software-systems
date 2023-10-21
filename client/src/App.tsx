import './App.scss';
import axios, {AxiosResponse} from "axios";
import {useState} from "react";
import {Button, Table} from "react-bootstrap";

function App() {
  const [userCount, setUserCount] = useState(-1);
  const urlProxy: string = "/api/v1";

  function getUserCount() {
    axios
      .get(`${urlProxy}/user/count`)
      .then((res: AxiosResponse) => setUserCount(res.data))
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Table className="greeting align-middle" bordered>
      <thead>
        <tr>
          <th>Source</th>
          <th>Output</th>
          <th>Sync</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Database</td>
          <td>{userCount}</td>
          <td>
            <Button
              onClick={getUserCount}
              className="user-count-button"
            >Update</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export { App };
