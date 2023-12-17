import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {ProjectCreate} from "../../project/create/ProjectCreate.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('ProjectCreate', () => {
    it('should render ProjectCreate page', () => {
      render(
        <BrowserRouter>
          <ProjectCreate />
        </BrowserRouter>
      );

      const content: HTMLElement = screen.getByText(/Create a Project/);

      expect(content).toBeInTheDocument();
    });
  });
});
