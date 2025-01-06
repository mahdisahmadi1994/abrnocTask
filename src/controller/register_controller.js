import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { UserEntity } from '../model/user_model.js';

const registerUser = async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return reply.status(400).send({ error: "Username and password are required" });
    }

    try {
        const userRepository = getRepository(UserEntity);
        const existingUser = await userRepository.findOne({ where: { username } });

        if (existingUser) {
            return reply.status(400).send({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

        const newUser = userRepository.create({ username, password: hashedPassword });
        await userRepository.save(newUser);

        return reply.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return reply.status(500).send({ error: "Error registering user" });
    }
};

export default registerUser;