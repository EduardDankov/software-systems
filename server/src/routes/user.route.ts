import {Router} from "express";
import {checkCredentials, getCount} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/count', getCount);
userRouter.post('/login', checkCredentials);

export { userRouter };
