import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {TaskDetails} from "../../task/details/TaskDetails.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('TaskDetails', () => {
    it('should render TaskDetails page', () => {
      render(
        <BrowserRouter>
          <TaskDetails />
        </BrowserRouter>
      );

      const content: HTMLElement = screen.getByText(/Task #/);

      expect(content).toBeInTheDocument();
    });
  });
});
