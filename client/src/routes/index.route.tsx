import {createBrowserRouter} from "react-router-dom";

import {Home} from "../pages/Home";
import {LogIn} from "../pages/user/login/LogIn";
import {NotFound} from "../pages/error/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/user/login",
    element: <LogIn />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export {router};
