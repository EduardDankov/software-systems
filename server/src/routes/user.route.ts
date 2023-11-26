import {Router} from "express";
import {checkCredentials, checkIsEmailTaken, getCount, insertCredentials} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/count', getCount);
userRouter.get('/email-taken', checkIsEmailTaken);

userRouter.post('/login', checkCredentials);
userRouter.post('/register', insertCredentials);

export { userRouter };
