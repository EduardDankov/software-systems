import React, {MouseEventHandler} from "react";

import {Project} from "../models/project";
import {Button} from "react-bootstrap";

interface ProjectTableProps {
  projectData: Project,
  onClick?: MouseEventHandler
}

class ProjectTable extends React.Component<ProjectTableProps> {
  constructor(props: ProjectTableProps) {
    super(props);
  }

  render() {
    const project: Project = this.props.projectData;
    return (
      <tr>
        <td>{project.id}</td>
        <td>{project.name}</td>
        <td>{project.description}</td>
        <td>{project.manager.username} &lt;{project.manager.email}&gt;</td>
        <td>{project.createdAt.toDateString()}</td>
        <td>{project.modifiedAt.toDateString()}</td>
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
        <th>Manager</th>
        <th>Created</th>
        <th>Modified</th>
      </tr>
    );
  }
}

export {ProjectTable};
