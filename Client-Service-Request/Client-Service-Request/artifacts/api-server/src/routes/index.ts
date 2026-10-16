import { Router, type IRouter } from "express";
import healthRouter from "./health";
import clientServiceRequestsRouter from "./client-service-requests";

const router: IRouter = Router();

router.use(healthRouter);
router.use(clientServiceRequestsRouter);

export default router;
