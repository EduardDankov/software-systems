import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {UserRegister} from "../../user/register/UserRegister.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('UserRegister', () => {
    it('should render UserRegister page', () => {
      render(
        <BrowserRouter>
          <UserRegister />
        </BrowserRouter>
      );

      const content: Array<HTMLElement> = screen.getAllByText(/Register/);

      content.forEach(element => expect(element).toBeInTheDocument());
      expect(content.length).toEqual(2); // Page title and submit button label
    });
  });
});
