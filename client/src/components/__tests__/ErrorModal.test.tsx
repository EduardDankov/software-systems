import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

import {ErrorModal, ErrorModalProps} from "../ErrorModal.tsx";

describe('Components', () => {
  describe('ErrorModal', () => {
    it('should render ErrorModal', () => {
      const errorModalMock: ErrorModalProps = {
        show: true,
        onHide: (): void => {},
        message: "This is a simple test message"
      };

      render(
        <ErrorModal
            show={errorModalMock.show}
            onHide={errorModalMock.onHide}
            message={errorModalMock.message}
        />
      );

      const element: HTMLElement = screen.getByText(errorModalMock.message);

      expect(element).toBeInTheDocument();
      expect(element).toContainHTML('p');
    });
  });
});
