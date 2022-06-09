import { nanoid } from "nanoid";

import db from "./../db.js";

export async function postShorten(req, res) {
    const url = req.body.url;
    const userId = res.locals.userId;
    const shortUrl = nanoid();

    try {
        await db.query(
            `INSERT INTO urls (url, "shortUrl", "userId")
            VALUES ($1, $2, $3)`,
            [url, shortUrl, userId]
        );

        res.status(201).send({shortUrl})
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};