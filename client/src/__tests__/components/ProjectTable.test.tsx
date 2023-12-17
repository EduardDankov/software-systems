import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {ProjectTable} from "../../components/ProjectTable.tsx";
import {Project} from "../../models/project.tsx";

describe('Components', () => {
  describe('ProjectTable', () => {
    it('should render ProjectTable', () => {
      const testId: number = 1;
      const projectTableMock: Array<Project> = [
        {
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
        {
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
        {
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
      ];

      const projectTableOnClickMock = (): void => {};

      render(
        <table data-testid={testId}>
          <tbody>
          {
            projectTableMock.map((project, index) =>
              <ProjectTable
                key={index}
                projectData={project}
                onClick={projectTableOnClickMock}
              />
            )
          }
          </tbody>
        </table>
      );

      const content: Array<HTMLElement> = screen.getAllByTestId(testId);

      content.forEach(element => expect(element).toBeInTheDocument());
    });

    it('should render ProjectTable.Header', () => {
      const testId: number = 2;

      render(
        <table data-testid={testId}>
          <thead>
          <ProjectTable.Header />
          </thead>
        </table>
      );

      const element: HTMLElement = screen.getByTestId(testId);

      expect(element).toBeInTheDocument();
    });
  });
});
