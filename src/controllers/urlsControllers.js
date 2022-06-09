import { nanoid } from "nanoid";

import db from "./../db.js";

export async function postShorten(req, res) {
    const url = req.body.url;
    const userId = res.locals.user.id;
    const shortUrl = nanoid();

    try {
        await db.query(
            `INSERT INTO urls (url, "shortUrl", "userId")
            VALUES ($1, $2, $3)`,
            [url, shortUrl, userId]
        );

        res.status(201).send({ shortUrl });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUrl(req, res) {
    const id = parseInt(req.params.id);

    try {
        const urlResult = await db.query(
            `SELECT id, "shortUrl", url
            FROM urls
            WHERE id = $1;`,
            [id]
        );

        if (urlResult.rows.length === 0) {
            res.sendStatus(404);
            return;
        }

        res.status(200).send(urlResult.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const urlResult = await db.query(
            `SELECT url, "visitCount", id FROM urls
            WHERE "shortUrl" = $1`,
            [shortUrl]
        );

        const url = urlResult.rows[0];

        if (!url) {
            res.sendStatus(404);
            return;
        }

        const visitCount = url.visitCount + 1;

        await db.query(
            `UPDATE urls SET "visitCount" = $1
            WHERE id = $2`,
            [visitCount, url.id]
        );

        res.redirect(url.url);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    const userId = res.locals.user.id;
    const id = parseInt(req.params.id);

    const urlResult = await db.query(
        `SELECT "userId" FROM urls
        WHERE id = $1`,
        [id]
    );

    const url = urlResult.rows[0];
    if(!url){
        res.sendStatus(404);
        return;
    };

    if(url.userId !== userId){
        res.sendStatus(401);
        return;
    };

    await db.query(
        `DELETE FROM urls
        WHERE id = $1`,
        [id]
    );

    res.sendStatus(204);
}
