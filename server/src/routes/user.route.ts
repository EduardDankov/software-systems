import {Router} from "express";
import {
  checkCredentials,
  checkIsEmailTaken,
  getCount, getUserData,
  insertCredentials,
  updateCredentials
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/data', getUserData);
userRouter.get('/count', getCount);
userRouter.get('/email-taken', checkIsEmailTaken);

userRouter.post('/login', checkCredentials);
userRouter.post('/register', insertCredentials);
userRouter.post('/update', updateCredentials);

export { userRouter };
