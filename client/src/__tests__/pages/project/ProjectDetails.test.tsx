import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {ProjectDetails} from "../../../pages/project/details/ProjectDetails.tsx";
import {BrowserRouter} from "react-router-dom";


describe('Pages', () => {
  describe('ProjectDetails', () => {
    it('should render ProjectDetails page', () => {
      render(
        <BrowserRouter>
          <ProjectDetails />
        </BrowserRouter>
      );

      const content: HTMLElement = screen.getByText(/Project #/);

      expect(content).toBeInTheDocument();
    });
  });
});
