import {Route, Routes} from "react-router-dom";

import {Tasks} from "../pages/task/Tasks";
import {TaskDetails} from "../pages/task/details/TaskDetails";

function TaskRouter() {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
      <Route path="/:taskId" element={<TaskDetails />} />
    </Routes>
  );
}

export {TaskRouter};
