import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {TaskTable} from '../../components/TaskTable.tsx';
import {Task, TaskPriority, TaskStatus} from "../../models/task.tsx";

describe('Components', () => {
  describe('TaskTable', () => {
    it('should render TaskTable', () => {
      const testId: number = 1;
      const taskTableMock: Array<Task> = [
        {
          id: 1,
          name: "Manual test",
          description: "Test the app manually",
          priority: TaskPriority.HIGH,
          status: TaskStatus.CREATED,
          project: {
            id: 1,
            name: "software-systems",
            description: "A test university project",
            manager: {
              id: 1,
              username: "John Smith",
              email: "john.smith@example.com"
            },
            createdAt: new Date(),
            modifiedAt: new Date()
          },
          assignee: {
            id: 1,
            username: "John Smith",
            email: "john.smith@example.com"
          },
          createdAt: new Date(),
          modifiedAt: new Date(),
          deadline: new Date(Date.now() + 1E6)
        },
        {
          id: 2,
          name: "Automatic Test",
          description: "Test the app automatically",
          priority: TaskPriority.HIGH,
          status: TaskStatus.CREATED,
          project: {
            id: 2,
            name: "thorium-os",
            description: "A test OS project",
            manager: {
              id: 2,
              username: "Emily Johnson",
              email: "emily.johnson@example.com"
            },
            createdAt: new Date(),
            modifiedAt: new Date()
          },
          assignee: {
            id: 2,
            username: "Emily Johnson",
            email: "emily.johnson@example.com"
          },
          createdAt: new Date(),
          modifiedAt: new Date(),
          deadline: new Date(Date.now() + 1E6)
        },
        {
          id: 3,
          name: "Design database",
          description: "Design the database layout",
          priority: TaskPriority.URGENT,
          status: TaskStatus.CREATED,
          project: {
            id: 3,
            name: "amber-pharmaceuticals",
            description: "A test enterprise website project",
            manager: {
              id: 3,
              username: "Sam Jackson",
              email: "sam.jackson@example.com"
            },
            createdAt: new Date(),
            modifiedAt: new Date()
          },
          assignee: {
            id: 3,
            username: "Sam Jackson",
            email: "sam.jackson@example.com"
          },
          createdAt: new Date(),
          modifiedAt: new Date(),
          deadline: new Date(Date.now() + 1E6)
        }
      ];

      const taskTableOnClickMock = (): void => {};

      render(
        <table data-testid={testId}>
          <tbody>
          {
            taskTableMock.map((task, index) =>
              <TaskTable
                key={index}
                taskData={task}
                onClick={taskTableOnClickMock}
              />
            )
          }
          </tbody>
        </table>
      );

      const content: Array<HTMLElement> = screen.getAllByTestId(testId);

      content.forEach(element => expect(element).toBeInTheDocument());
    });

    it('should render TaskTable.Header', () => {
      const testId: number = 2;

      render(
        <table data-testid={testId}>
          <thead>
          <TaskTable.Header />
          </thead>
        </table>
      );

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toBeInTheDocument();
    });
  });
});
