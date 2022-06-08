import { Router } from "express";
import { signin, signup } from "../controllers/authControllers.js";
import { validateSchema } from "../middlewares/joiValidationMiddleware.js";
import { signinSchema, signupSchema } from "../schemas/authSchemas.js";

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

export default authRouter;
