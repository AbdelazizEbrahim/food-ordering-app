import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        const body = await req.json();

        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to db");

        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            console.log("user already exists");
            return new Response(
                JSON.stringify({ message: "User already exists" }),
                { status: 400 }
            );
        }

        const createdUser = await User.create(body); 
        console.log("User created");
        return new Response(JSON.stringify(createdUser), { status: 201 });

    } catch (err) {
        console.log("error while creating: ", err.message);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
