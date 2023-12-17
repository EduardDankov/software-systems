import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {ProjectDelete} from "../../../pages/project/details/delete/ProjectDelete.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('ProjectDelete', () => {
    it('should render ProjectDelete page', () => {
      const testId: number = 1;
      render(
        <div data-testid={testId}>
          <BrowserRouter>
            <ProjectDelete />
          </BrowserRouter>
        </div>
      );

      const content: HTMLElement = screen.getByTestId(testId);

      expect(content).toBeInTheDocument();
    });
  });
});
