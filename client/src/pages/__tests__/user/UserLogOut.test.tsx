import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

import {UserLogOut} from "../../user/logout/UserLogOut.tsx";

describe('Pages', () => {
  describe('UserLogOut', () => {
    it('should render UserLogOut page', () => {
      render(
        <BrowserRouter>
          <UserLogOut />
        </BrowserRouter>
      );

      const content: HTMLElement = screen.getByText(/You were logged out/);

      expect(content).toBeInTheDocument();
    });
  });
});
