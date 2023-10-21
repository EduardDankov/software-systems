import {Router} from "express";
import {getCount} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/count', getCount);

export { userRouter };
