import React, {MouseEventHandler} from "react";
import {Button} from "react-bootstrap";

import {Task} from "../models/task";

interface TaskTableProps {
  taskData: Task,
  onClick?: MouseEventHandler
}

class TaskTable extends React.Component<TaskTableProps> {
  public static taskStatus: Array<string> = [
    'Created',
    'In process',
    'Delayed',
    'Canceled',
    'Completed'
  ];

  public static taskPriority: Array<string> = [
    'Low',
    'Normal',
    'High',
    'Urgent'
  ];

  constructor(props: TaskTableProps) {
    super(props);
  }

  render() {
    const task: Task = this.props.taskData;
    return (
      <tr>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td>{TaskTable.taskPriority[task.priority]}</td>
        <td>{TaskTable.taskStatus[task.status]}</td>
        <td>{task.project.name}</td>
        <td>{task.assignee.username} &lt;{task.assignee.email}&gt;</td>
        <td>{task.createdAt.toDateString()}</td>
        <td>{task.modifiedAt.toDateString()}</td>
        <td>{task.deadline.toDateString()}</td>
        {this.props.onClick &&
          <td>
            <Button onClick={this.props.onClick} variant="primary">Details</Button>
          </td>
        }
      </tr>
    );
  }

  static Header = () => {
    return (
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Status</th>
        <th>Project</th>
        <th>Assignee</th>
        <th>Created</th>
        <th>Modified</th>
        <th>Deadline</th>
      </tr>
    );
  }
}

export {TaskTable};
