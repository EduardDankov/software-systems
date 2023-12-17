import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {Home} from "../../pages/Home.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('Home', () => {
    it('should render Home page', () => {
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

      const content: Array<HTMLElement> = screen.getAllByText(/Software Systems/);

      content.forEach(element => expect(element).toBeInTheDocument());
      expect(content.length).toEqual(2); // Brand and page title
    });
  });
});
