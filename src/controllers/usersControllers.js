import db from "./../db.js";

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
    
}
