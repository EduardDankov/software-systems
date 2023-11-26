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
    setErrorMessage(`Code: ${err.error.request.status}. Try again later.`);
  });

  return (
    <>
      <ErrorModal
        show={isError}
        onHide={() => setIsError(false)}
        errorMessage={errorMessage}
      />
      <RouterProvider router={router} />
    </>
  );
}

export { App };
