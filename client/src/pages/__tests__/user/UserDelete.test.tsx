import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {UserDelete} from "../../user/delete/UserDelete.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('UserDelete', () => {
    it('should render UserDelete page', () => {
      const testId: number = 1;

      render(
        <div data-testid={testId}>
          <BrowserRouter>
            <UserDelete />
          </BrowserRouter>
        </div>
      );

      const content: HTMLElement = screen.getByTestId(testId);

      expect(content).toBeInTheDocument();
    });
  });
});
