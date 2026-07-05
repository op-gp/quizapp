import type { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.ts';

// Route logic for api/auth/register
export const register = async (req : Request, res: Response) => {
    try {
        const { username, password, role} = req.body;

        if (!username || !password || !role){
            console.error("authController: All fields are required.")
            return res.status(404).json({message: "All fields are required"});
        }

        const existingUser = await User.findOne({username});

        if (existingUser){
            return res.status(400).json({message: "Username has already been taken."})
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({
            username,
            hashedPassword,
            role
        });

        // Save the new user into the mongoDB database.
        const newUser = await user.save();

        // Return a 201 HTTP Response (201:  Created)
        res.status(201).json(newUser);
        console.log("User \'", newUser.username, "\' has been registered");
    }
    catch (error) {
        console.error("authController: Failed to register", error);
        res.status(500).json({message: "Error to register new user."})
    }
}

export const login = async () => {

}
