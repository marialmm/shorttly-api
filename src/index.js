import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.listen(port, () => console.log(chalk.green(`Server running on port ${port}`)));