import { Router } from "express";

import { getRanking, getUser } from "./../controllers/usersControllers.js";
import validateToken from "./../middlewares/authMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users/:id", validateToken, getUser);
usersRouter.get("/ranking", getRanking);

export default usersRouter;
