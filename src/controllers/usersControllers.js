import db from "./../db.js";
import {v4 as uuid} from "uuid";

export async function signup(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
        res.status(422).send("password and confirmPassword must be equals");
        return;
    }

    //TODO: create hash for password

    try {
        await db.query(
            `INSERT INTO users
            ("name", "email", "password")
            VALUES ($1, $2, $3);
            `,
            [req.body.name, req.body.email, req.body.password]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signin(req, res) {
    try{
        const userResult = await db.query(
            `SELECT * FROM users
            WHERE email = $1
            AND password = $2
            `, [req.body.email, req.body.password]
        );

        if(userResult.rows.length === 0) {
            res.sendStatus(401);
            return;
        }

        const user = userResult.rows[0];

        const token = uuid();

        await db.query(
            `INSERT INTO sessions
            ("userId", "token")
            VALUES ($1, $2);`, [user.id, token]
        )

        res.status(200).send(token);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUser(req, res) {
    
}

export async function getRanking(req, res) {
    console.log('pegando ranking')
    try {
        const rankingResult = await db.query(
            `SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(urls."visitCount") AS "visitCount" 
            FROM users
            JOIN urls ON users.id = urls."userId"
            GROUP BY users.id, users.name
            ORDER BY "visitCount"
            LIMIT 10;`
        );
        console.log(rankingResult.rows);

        res.status(200).send(rankingResult.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}