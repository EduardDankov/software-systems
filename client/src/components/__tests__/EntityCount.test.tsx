import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {EntityCount, EntityCountProps} from "../EntityCount.tsx";

describe('Components', () => {
  describe('EntityCount', () => {
    it('should render EntityCount', () => {
      const testId: number = 1;
      const entityCountMock: Array<EntityCountProps> = [
        {
          entity: "User",
          count: 10,
          onClick: (): void => {}
        },
        {
          entity: "Project",
          count: 5,
          onClick: (): void => {}
        },
        {
          entity: "Task",
          count: 16,
          onClick: (): void => {}
        }
      ];

      render(
        <table data-testid={testId}>
          <tbody>
          {
            entityCountMock.map((mock, index) =>
              <EntityCount
                key={index}
                entity={mock.entity}
                count={mock.count}
                onClick={mock.onClick}
              />
            )
          }
          </tbody>
        </table>
      );

      const content: Array<HTMLElement> = screen.getAllByTestId(testId);

      content.forEach(element => expect(element).toBeInTheDocument());
    });

    it('should render EntityCount.Header', () => {
      const testId: number = 2;

      render(
        <table data-testid={testId}>
          <thead>
            <EntityCount.Header />
          </thead>
        </table>
      );

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toBeInTheDocument();
    });
  });
});
