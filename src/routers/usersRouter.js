import { Router } from "express";
import { validateSchema } from "./../middlewares/joiValidationMiddleware.js";
import { signinSchema, signupSchema } from "./../schemas/usersSchemas.js";
import { getRanking, getUser, signin, signup } from "./../controllers/usersControllers.js";

const usersRouter = Router();

usersRouter.post(
    "/signup",
    (req, res, next) => {
        validateSchema(req, res, next, signupSchema);
    },
    signup
);
usersRouter.post(
    "/signin",
    (req, res, next) => {
        validateSchema(req, res, next, signinSchema);
    },
    signin
);
usersRouter.get("/users/:id", getUser);
usersRouter.get("/users/ranking", getRanking);

export default usersRouter;
