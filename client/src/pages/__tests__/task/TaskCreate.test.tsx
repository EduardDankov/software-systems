import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {TaskCreate} from "../../task/create/TaskCreate.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('TaskCreate', () => {
    it('should render TaskCreate page', () => {
      render(
        <BrowserRouter>
          <TaskCreate />
        </BrowserRouter>
      );

      const content: HTMLElement = screen.getByText(/Create a Task/);

      expect(content).toBeInTheDocument();
    });
  });
});
