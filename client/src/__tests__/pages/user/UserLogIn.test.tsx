import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

import {UserLogIn} from "../../../pages/user/login/UserLogIn.tsx";

describe('Pages', () => {
  describe('UserLogIn', () => {
    it('should render UserLogin page', () => {
      render(
        <BrowserRouter>
          <UserLogIn />
        </BrowserRouter>
      );

      const content: Array<HTMLElement> = screen.getAllByText(/Log In/);

      content.forEach(element => expect(element).toBeInTheDocument());
      expect(content.length).toEqual(2); // Page title and submit button label
    });
  });
});
