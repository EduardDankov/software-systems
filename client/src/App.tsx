import './App.scss';

import {ErrorModal} from "./components/ErrorModal";
import {useState} from "react";
import {RouterProvider} from "react-router-dom";

import {router} from "./routes/index.route";

function App() {
  const [isError, setIsError] = useState(false);

  window.addEventListener('error', () => {
    setIsError(true);
  });

  return (
    <>
      <ErrorModal show={isError} onHide={() => setIsError(false)} />
      <RouterProvider router={router} />
    </>
  );
}

export { App };
