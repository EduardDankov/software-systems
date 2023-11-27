import {Route, Routes} from "react-router-dom";

import {Tasks} from "../pages/task/Tasks";
import {TaskDetails} from "../pages/task/details/TaskDetails";
import {TaskEdit} from "../pages/task/details/edit/TaskEdit";

function TaskRouter() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/:taskId" element={<TaskDetails />} />
      <Route path="/:taskId/edit" element={<TaskEdit />} />
    </Routes>
  );
}

export {TaskRouter};
