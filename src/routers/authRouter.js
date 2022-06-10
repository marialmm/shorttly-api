import { Router } from "express";
import { signin, signout, signup } from "./../controllers/authControllers.js";
import { validateSchema } from "./../middlewares/joiValidationMiddleware.js";
import validateToken from "./../middlewares/authMiddleware.js";
import { signinSchema, signupSchema } from "./../schemas/authSchemas.js";

const authRouter = Router();

authRouter.post(
    "/signup",
    (req, res, next) => {
        validateSchema(req, res, next, signupSchema);
    },
    signup
);
authRouter.post(
    "/signin",
    (req, res, next) => {
        validateSchema(req, res, next, signinSchema);
    },
    signin
);
authRouter.delete("/signout", validateToken, signout);

export default authRouter;
