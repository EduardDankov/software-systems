import {Button, Modal} from "react-bootstrap";

interface ErrorModalProps {
  show: boolean;
  onHide: () => void;
  errorMessage: string;
}

function ErrorModal(props: ErrorModalProps) {
  return (
    <Modal
      {...props}
      aria-labelledby="error-modal-title"
      centered
    >
      <Modal.Header>
        <Modal.Title id="error-modal-title">
          Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.errorMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export {ErrorModal};
