import db from "./../db.js";

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