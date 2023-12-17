import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {ProjectEdit} from "../../../pages/project/details/edit/ProjectEdit.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('ProjectEdit', () => {
    it('should render ProjectEdit page', () => {
      const testId: number = 1;
      render(
        <div data-testid={testId}>
          <BrowserRouter>
            <ProjectEdit />
          </BrowserRouter>
        </div>
      );

      const content: HTMLElement = screen.getByTestId(testId);

      expect(content).toBeInTheDocument();
    });
  });
});
