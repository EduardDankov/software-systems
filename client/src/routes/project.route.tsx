import {Route, Routes} from "react-router-dom";

import {Projects} from "../pages/project/Projects.tsx";

function ProjectRouter() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
    </Routes>
  );
}

export {ProjectRouter};
