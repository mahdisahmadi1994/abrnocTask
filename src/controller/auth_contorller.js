import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { UserEntity } from "../model/user_model.js";
import { jwt_secret } from "../config/env.js"; // Use a strong secret key

const loginUser = async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return reply.status(400).send({ error: "Username and password are required" });
    }

    try {
        const userRepository = getRepository(UserEntity);
        const user = await userRepository.findOne({ where: { username } });

        if (!user) {
            return reply.status(401).send({ error: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return reply.status(401).send({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, jwt_secret, { expiresIn: "1h" });

        return reply.send({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        return reply.status(500).send({ error: "Error logging in" });
    }
};

export default loginUser;