import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignUp, verifyUser } from "../controllers/userController.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { jwtAuthMiddleware } from "../utils/jwt.js";
const userRouter=Router();

userRouter.get("/",getAllUsers);
userRouter.post("/signup",validate(signupValidator),userSignUp);
userRouter.post("/login",validate(loginValidator),userLogin);
userRouter.get("/auth-status",jwtAuthMiddleware,verifyUser);
userRouter.get("/logout",jwtAuthMiddleware,userLogout);
export default userRouter;