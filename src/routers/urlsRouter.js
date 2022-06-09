import { Router } from "express";
import { validateSchema } from "./../middlewares/joiValidationMiddleware.js";
import { urlSchema } from "./../schemas/urlSchemas.js";
import {
    postShorten,
    getUrl,
    openUrl,
    deleteUrl,
} from "./../controllers/urlsControllers.js";
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
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);

export default urlsRouter;
