import { Router } from "express";
import { jwtAuthMiddleware } from "../utils/jwt.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chatControllers.js";
const chatRouter = Router();
chatRouter.post("/new", validate(chatCompletionValidator), jwtAuthMiddleware, generateChatCompletion);
chatRouter.get("/all-chats", jwtAuthMiddleware, sendChatsToUser);
chatRouter.delete("/delete", jwtAuthMiddleware, deleteChats);
export default chatRouter;
//# sourceMappingURL=chat.js.map