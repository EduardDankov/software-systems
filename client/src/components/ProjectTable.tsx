import {Button} from "react-bootstrap";
import React from "react";

import {formatKebabCase} from "../utils/format/string/formatKebabCase";
import {Project} from "../models/project";

interface ProjectTableProps {
  projectData: Project
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
