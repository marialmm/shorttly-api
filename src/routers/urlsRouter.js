import { Router } from "express";
import { validateSchema } from "./../middlewares/joiValidationMiddleware.js";
import { urlSchema } from "./../schemas/urlSchemas.js";
import { postShorten } from "./../controllers/urlsControllers.js";
import validateToken from "./../middlewares/authMiddleware.js";

const urlsRouter = Router();

urlsRouter.post(
    "/urls/shorten",
    (req, res, next) => {
        validateSchema(req, res, next, urlSchema);
    },
    validateToken,
    postShorten
);

export default urlsRouter;
