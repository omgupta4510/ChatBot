import { Router } from "express";
import userRouter from "./user.js";
import chatRouter from "./chat.js";
const appRouter = Router();
appRouter.use("/user", userRouter);
appRouter.use("/chat", chatRouter);
export default appRouter;
//# sourceMappingURL=index.js.map