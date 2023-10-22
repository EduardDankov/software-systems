import {Router} from "express";
import {getCount} from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.get('/count', getCount);

export { projectRouter };
