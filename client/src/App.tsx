import './App.scss';

import {useState} from "react";
import {RouterProvider} from "react-router-dom";

import {ErrorModal} from "./components/ErrorModal";
import {router} from "./routes/index.route";

function App() {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('An error occurred. Try again later.');

  window.addEventListener('error', (err) => {
    err.preventDefault();
    setIsError(true);
    setErrorMessage(err.error.message);
  });

  return (
    <>
      <ErrorModal
        show={isError}
        onHide={() => setIsError(false)}
        message={errorMessage}
      />
      <RouterProvider router={router} />
    </>
  );
}

export { App };
