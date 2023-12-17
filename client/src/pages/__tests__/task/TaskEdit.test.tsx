import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {TaskEdit} from "../../task/details/edit/TaskEdit.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('TaskEdit', () => {
    it('should render TaskEdit page', () => {
      const testId: number = 1;
      render(
        <div data-testid={testId}>
          <BrowserRouter>
            <TaskEdit />
          </BrowserRouter>
        </div>
      );

      const content: HTMLElement = screen.getByTestId(testId);

      expect(content).toBeInTheDocument();
    });
  });
});
