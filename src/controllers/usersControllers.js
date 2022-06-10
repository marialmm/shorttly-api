import db from "./../db.js";

export async function getUser(req, res) {
    const id = parseInt(req.params.id);
    const {user} = res.locals;

    if(id !== user.id){
        res.sendStatus(401);
        return;
    }

    try {
        const visitCountResult = await db.query(
            `SELECT SUM(ur."visitCount") AS "visitCount"
            FROM users us
            JOIN urls ur ON ur."userId" = us.id
            WHERE us.id = $1;`,
            [id]
        );

        const {visitCount} = visitCountResult.rows[0];

        if(!visitCount) {
            visitCount = 0;
        };
        
        user.visitCount = visitCount;

        const urlsResult = await db.query(
            `SELECT id, "shortUrl", url, "visitCount"
            FROM urls
            WHERE "userId" = $1`,
            [id]
        );

        const urls = urlsResult.rows;

        user.shortenedUrls = urls;

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getRanking(req, res) {
    try {
        const rankingResult = await db.query(
            `SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(urls."visitCount") AS "visitCount" 
            FROM users
            LEFT JOIN urls ON users.id = urls."userId"
            GROUP BY users.id, users.name
            ORDER BY "visitCount"
            LIMIT 10;`
        );

        rankingResult.rows.forEach(ranking => {
            if(ranking.visitCount === null){
                ranking.visitCount = 0;
            }
        })

        res.status(200).send(rankingResult.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
