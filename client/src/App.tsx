import './App.scss';

import {Home} from "./pages/Home";
import {ErrorModal} from "./components/ErrorModal";
import {useState} from "react";

function App() {
  const [isError, setIsError] = useState(false);

  window.addEventListener('error', () => {
    setIsError(true);
  });

  return (
    <>
      <ErrorModal show={isError} onHide={() => setIsError(false)} />
      <Home />
    </>
  );
}

export { App };
