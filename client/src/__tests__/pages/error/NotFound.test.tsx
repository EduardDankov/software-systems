import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {NotFound} from "../../../pages/error/NotFound.tsx";

describe('Pages', () => {
  describe('NotFound', () => {
    it('should render NotFound page', () => {
      render(<NotFound />);

      const content: HTMLElement = screen.getByText(/404: The page was not found\./);

      expect(content).toBeInTheDocument();
    });
  });
});
