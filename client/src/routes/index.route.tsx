import {createBrowserRouter} from "react-router-dom";

import {Home} from "../pages/Home";
import {UserRouter} from "./user.route";
import {ProjectRouter} from "./project.route";
import {NotFound} from "../pages/error/NotFound";
import {TaskRouter} from "./task.route";

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
    path: "/task/*",
    element: <TaskRouter />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export {router};
