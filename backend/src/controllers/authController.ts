import type { Request, Response} from 'express';
import User from '../models/User.ts';

// Route logic for api/auth/users
export const fetchUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching all users");
        res.status(500).json({message: "Error retrieving users", error})
    }
}

// Route logic for api/auth/register
export const register = async (req : Request, res: Response) => {
    try {
        const { username, password, role} = req.body;

        const user = new User({
            username,
            password,
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

// Route logic for api/auth/user/<id>
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userToDelete = await User.findByIdAndDelete(
            req.params.id
        )

        if (!userToDelete){
            console.error("User could not be found.");
            return res.status(404).json({message: "User does not exist."})
        }

        console.log("User (", userToDelete.username, ") has been successfully deleted.")
        res.status(200).json({username: userToDelete.username, message: "User of above mentioned username has been deleted"})
    }
    catch (error){
        console.error("Error in deleteUser controller", error);
        res.status(500).json({message: "Error in deleting user."})
    }
}
