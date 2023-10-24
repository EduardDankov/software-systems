import {createBrowserRouter} from "react-router-dom";

import {Home} from "../pages/Home.tsx";
import {NotFound} from "../pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export {router};
