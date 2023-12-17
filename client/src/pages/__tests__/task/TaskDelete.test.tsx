import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {TaskDelete} from "../../task/details/delete/TaskDelete.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('TaskDelete', () => {
    it('should render TaskDelete page', () => {
      const testId: number = 1;
      render(
        <div data-testid={testId}>
          <BrowserRouter>
            <TaskDelete />
          </BrowserRouter>
        </div>
      );

      const content: HTMLElement = screen.getByTestId(testId);

      expect(content).toBeInTheDocument();
    });
  });
});
