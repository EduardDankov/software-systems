import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {UserCabinet} from "../user/UserCabinet.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('UserCabinet', () => {
    it('should render UserCabinet page', () => {
      render(
        <BrowserRouter>
          <UserCabinet />
        </BrowserRouter>
      );

      // Should redirect to login page if unauthorized
      const content: HTMLElement = screen.getByText(/Cabinet/);

      expect(content).toBeInTheDocument();
    });
  });
});
