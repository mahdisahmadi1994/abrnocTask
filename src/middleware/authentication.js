import jwt from 'jsonwebtoken';
import { jwt_secret } from "../config/env.js";

const jwtMiddleware = async (request, reply, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return reply.status(401).send({ error: "Access token is missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, jwt_secret);
        request.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        return reply.status(401).send({ error: "Invalid or expired token" });
    }
};

export default jwtMiddleware;
