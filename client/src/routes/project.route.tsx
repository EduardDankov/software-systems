import {Route, Routes} from "react-router-dom";

import {Projects} from "../pages/project/Projects";
import {ProjectDetails} from "../pages/project/details/ProjectDetails";
import {ProjectEdit} from "../pages/project/details/edit/ProjectEdit";

function ProjectRouter() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/:projectId" element={<ProjectDetails />} />
      <Route path="/:projectId/edit" element={<ProjectEdit />} />
    </Routes>
  );
}

export {ProjectRouter};
