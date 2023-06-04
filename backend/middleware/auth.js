import jwt from "jsonwebtoken";
import ENV from "../config.js";

export default async function Auth(req, res, next){
    try{
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details fo the logged in user
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;

        next()
        // res.js on(token);
    } catch (error){
        res.status(401).json({ error : "Authentication Failed!"})
    }
}