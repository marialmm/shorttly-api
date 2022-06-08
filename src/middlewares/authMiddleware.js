import db from "./../db.js";

export default async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try{
        const userResult = await db.query(
            `SELECT users.id FROM users
            JOIN sessions ON sessions."userId" = users.id
            WHERE sessions.token = $1;
            `, [token]
        );

        if(userResult.rows.length === 0) {
            res.sendStatus(401);
            return;
        }

        res.locals.userId = userResult.rows[0].id;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}