import "dotenv/config";
import UserModel from "../models/user.model";
import connectDatabase from "../config/database.config";

export const CreateConvoAI = async () => {
    let existingAI = await UserModel.findOne({ isAI: true });
    if(existingAI) {
        await UserModel.deleteOne({ _id: existingAI._id });
    }
    const convoAI = await UserModel.create({
        name: "Convo AI",
        isAI: true,
        avatar: "https://res.cloudinary.com/dhfwyxf2v/image/upload/v1761727680/ldm6ulmuujidkgporocc.png" // AI Avatar URL
    })
    console.log("✅ Convo AI created:", convoAI._id);
    return convoAI;
}

const seedConvoAI = async () => {
    try {
        await connectDatabase();
        await CreateConvoAI();
        console.log("Seeding Completed");
        process.exit(0); 
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seedConvoAI();