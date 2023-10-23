import {Button, Modal} from "react-bootstrap";

interface ErrorModalProps {
  show: boolean;
  onHide: () => void;
}

function ErrorModal(props: ErrorModalProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="error-modal-title"
      centered
    >
      <Modal.Header>
        <Modal.Title id="error-modal-title">
          Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>An error occurred. Try again later.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export {ErrorModal};
