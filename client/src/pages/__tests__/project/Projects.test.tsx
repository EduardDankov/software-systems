import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {Projects} from "../../project/Projects.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('Projects', () => {
    it('should render Projects page', () => {
      render(
        <BrowserRouter>
          <Projects />
        </BrowserRouter>
      );

      const content: Array<HTMLElement> = screen.getAllByText(/Projects/);

      content.forEach(element => expect(element).toBeInTheDocument());
      expect(content.length).toEqual(2); // Page title and menu link label
    });
  });
});
