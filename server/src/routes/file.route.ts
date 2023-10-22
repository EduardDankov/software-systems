import {Router} from "express";
import {getCount} from "../controllers/file.controller";

const fileRouter = Router();

fileRouter.get('/count', getCount);

export { fileRouter };
