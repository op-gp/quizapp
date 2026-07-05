import type { Request, Response } from 'express';
import User from "../models/User.ts";

// GET
// Route logic for api/admin/users
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

// DELETE
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