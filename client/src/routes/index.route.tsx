import {createBrowserRouter} from "react-router-dom";

import {Home} from "../pages/Home";
import {UserRouter} from "./user.route";
import {NotFound} from "../pages/error/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/user/*",
    element: <UserRouter />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export {router};
