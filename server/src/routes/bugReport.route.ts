import {Router} from "express";
import {getCount} from "../controllers/bugReport.controller";

const bugReportRouter = Router();

bugReportRouter.get('/count', getCount);

export { bugReportRouter };
