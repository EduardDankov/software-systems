import {Route, Routes} from "react-router-dom";

import {UserLogIn} from "../pages/user/login/UserLogIn.tsx";
import {UserLogOut} from "../pages/user/logout/UserLogOut.tsx";
import {UserRegister} from "../pages/user/register/UserRegister.tsx";
import {NotFound} from "../pages/error/NotFound";
import {UserCabinet} from "../pages/user/UserCabinet.tsx";
import {UserDelete} from "../pages/user/delete/UserDelete.tsx";

function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<UserCabinet />} />
      <Route path="/login" element={<UserLogIn />} />
      <Route path="/logout" element={<UserLogOut />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/:userId/delete" element={<UserDelete />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { UserRouter };
