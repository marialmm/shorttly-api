import db from "./../db.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function signup(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
        res.status(422).send("password and confirmPassword must be equals");
        return;
    }

    const password = bcrypt.hashSync(req.body.password, 10);

    try {
        await db.query(
            `INSERT INTO users
            ("name", "email", "password")
            VALUES ($1, $2, $3);
            `,
            [req.body.name, req.body.email, password]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            res.sendStatus(409);
            return;
        }
        res.sendStatus(500);
    }
}

export async function signin(req, res) {
    try {
        const userResult = await db.query(
            `SELECT * FROM users
            WHERE email = $1
            `,
            [req.body.email]
        );

        if (
            userResult.rows.length === 0 ||
            !bcrypt.compareSync(req.body.password, userResult.rows[0].password)
        ) {
            res.sendStatus(401);
            return;
        }

        const user = userResult.rows[0];

        const token = uuid();

        await db.query(
            `INSERT INTO sessions
            ("userId", "token")
            VALUES ($1, $2);`,
            [user.id, token]
        );

        res.status(200).send({ token, user: { id: user.id, name: user.name } });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signout(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        await db.query(
            `DELETE FROM sessions
            WHERE token = $1`,
            [token]
        );

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
