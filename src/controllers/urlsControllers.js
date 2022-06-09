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

export async function getUrl(req, res) {
    const id = parseInt(req.params.id);

    try{
        const urlResult = await db.query(
            `SELECT id, "shortUrl", url
            FROM urls
            WHERE id = $1;`, [id]
        );
        
        if (urlResult.rows.length === 0){
            res.sendStatus(404);
            return;
        }

        res.status(200).send(urlResult.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}