import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

import usersRouter from "./routers/usersRouter.js";
import urlsRouter from "./routers/urlsRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(usersRouter);
app.use(urlsRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(chalk.green(`Server running on port ${port}`)));