import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
export const jwtAuthMiddleware = (req, res, next) => {
    const token = req.signedCookies[COOKIE_NAME];
    if (!token)
        return res.status(401).json({ error: "Token Not Received" });
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                console.log("Token Verification Successfull");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
//fucntion to generate token
export const generateToken = (userData, exp) => {
    try {
        return jwt.sign(userData, process.env.JWT_SECRET, {
            expiresIn: exp,
        });
    }
    catch (err) {
        console.log(err);
        return null;
    }
};
//# sourceMappingURL=jwt.js.map