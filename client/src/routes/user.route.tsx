import {Route, Routes} from "react-router-dom";

import {LogIn} from "../pages/user/login/LogIn";
import {LogOut} from "../pages/user/logout/LogOut";
import {NotFound} from "../pages/error/NotFound";

function UserRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { UserRouter };
