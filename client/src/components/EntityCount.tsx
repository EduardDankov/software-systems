import {Button} from "react-bootstrap";
import React, {MouseEventHandler} from "react";

import {formatKebabCase} from "../utils/format/string/formatKebabCase";

interface EntityCountProps {
  entity: string;
  count: number;
  onClick: MouseEventHandler;
}

class EntityCount extends React.Component<EntityCountProps> {
  constructor(props: EntityCountProps) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.entity}</td>
        <td>{this.props.count}</td>
        <td>
          <Button
            onClick={this.props.onClick}
            className={`${formatKebabCase(this.props.entity)}-count-button`}
          >Update</Button>
        </td>
      </tr>
    );
  }

  static Header = () => {
    return (
      <tr>
        <th>Entity</th>
        <th>Count</th>
        <th>Sync</th>
      </tr>
    );
  }
}

export {EntityCount};
