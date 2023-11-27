import {Route, Routes} from "react-router-dom";

import {Tasks} from "../pages/task/Tasks";
import {TaskCreate} from "../pages/task/create/TaskCreate";
import {TaskDetails} from "../pages/task/details/TaskDetails";
import {TaskEdit} from "../pages/task/details/edit/TaskEdit";
import {NotFound} from "../pages/error/NotFound";

function TaskRouter() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/create" element={<TaskCreate />} />
      <Route path="/:taskId" element={<TaskDetails />} />
      <Route path="/:taskId/edit" element={<TaskEdit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export {TaskRouter};
