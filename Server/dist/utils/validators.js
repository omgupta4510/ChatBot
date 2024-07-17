import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty())
                break;
        }
        const err = validationResult(req);
        // console.log(err);
        if (err.isEmpty())
            return next();
        res.status(422).json({ error: err.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({ min: 3 }).withMessage("Password is required"),
];
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("mesaage").notEmpty().withMessage("Message is required"),
];
//# sourceMappingURL=validators.js.map