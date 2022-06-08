import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import usersRouter from "./routers/usersRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(usersRouter)

const port = process.env.PORT;

app.listen(port, () => console.log(chalk.green(`Server running on port ${port}`)));