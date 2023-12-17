import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

import {Menu} from "../Menu.tsx";
import {User} from "../../models/user.tsx";

describe('Components', () => {
  describe('Menu', () => {
    it('should render Menu for unauthorized user', async () => {
      const pageLabels: Array<string> = [
        "Software Systems",
        "Home",
        "Projects",
        "Tasks",
        "You are not logged in"
      ];

      render(
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      );

      pageLabels.forEach(label => {
        const element: HTMLElement = screen.getByText(label);
        expect(element).toBeInTheDocument();
      });
    });

    it('should render Menu for authorized user', async () => {
      const userDataMock: User = {
        id: -1,
        username: "John Smith",
        email: "Unknown"
      };

      sessionStorage.setItem('isLoggedIn', "1");
      sessionStorage.setItem('userData', JSON.stringify(userDataMock));

      const pageLabels: Array<string> = [
        "Software Systems",
        "Home",
        "Projects",
        "Tasks",
        userDataMock.username
      ];

      render(
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      );

      pageLabels.forEach(label => {
        const element: HTMLElement = screen.getByText(label);
        expect(element).toBeInTheDocument();
      });

      // Clear mocks
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userData');
    });
  });
});
