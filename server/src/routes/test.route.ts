import {Router} from "express";
import {getApiInfo} from "../controllers/test.controller";

const testRouter = Router();

testRouter.get('/info', getApiInfo);

export { testRouter };
