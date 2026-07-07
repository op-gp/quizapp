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

export const createCategory = () => {

}

// DELETE
// Route logic for api/auth/user/<id>
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const targetUserId = req.params.id;
        const callerUser = await User.findById(req.user?.id);
        const callerUserId = callerUser?.id;
        const callerUserRole = callerUser?.role;

        if (callerUserId === targetUserId){
            return res.status(400).json({message: "You cannot delete your own account."})
        }

        const targetUser = await User.findById(targetUserId);

        if (!targetUser){
            console.error("adminController.ts: User to be deleted does not exist.")
            return res.status(404).json({message: "User does not exist"})
        }

        const isTargetAdmin =  targetUser?.role === "admin" || targetUser?.role === "superadmin";
        if (isTargetAdmin && callerUserRole !== "superadmin"){
            console.error("adminController.ts: Only super admins can delete admins.");
            return res.status(403).json({message: "Only Super Admins can delete Admins."});
        }

        const userToDelete = await User.findByIdAndDelete(targetUserId);

        if (!userToDelete){
            console.error("User could not be found.");
            return res.status(404).json({message: "User does not exist."})
        }

        console.log("User (", userToDelete.username, ") has been successfully deleted.")
        res.status(200).json({message: "User below has been deleted", username: userToDelete.username,})
    }
    catch (error){
        console.error("Error in deleteUser controller", error);
        res.status(500).json({message: "Error in deleting user."})
    }
}