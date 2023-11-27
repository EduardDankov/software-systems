import {createBrowserRouter} from "react-router-dom";

import {Home} from "../pages/Home";
import {UserRouter} from "./user.route";
import {ProjectRouter} from "./project.route";
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
    path: "/project/*",
    element: <ProjectRouter />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export {router};
