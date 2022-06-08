export function validateSchema(req, res, next, schema){
    const body = req.body;

    const validate = schema.validate(body, {abortEarly: false});

    if (validate.error) {
        console.log(validate.error.details.map((detail) => detail.message));
        res.status(422).send(validate.error.details.map((detail) => detail.message));
        return;
    }

    next();
}