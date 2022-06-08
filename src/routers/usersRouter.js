import { Router } from "express";

import { getRanking, getUser } from "./../controllers/usersControllers.js";

const usersRouter = Router();

usersRouter.get("/users/:id", getUser);
usersRouter.get("/users/ranking", getRanking);

export default usersRouter;
