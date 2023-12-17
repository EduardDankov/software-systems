import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {Tasks} from "../../task/Tasks.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('Tasks', () => {
    it('should render Projects page', () => {
      render(
        <BrowserRouter>
          <Tasks />
        </BrowserRouter>
      );

      const content: Array<HTMLElement> = screen.getAllByText(/Tasks/);

      content.forEach(element => expect(element).toBeInTheDocument());
      expect(content.length).toEqual(2); // Page title and menu link label
    });
  });
});
