import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
    // console.log('PUT request received');

    try {
        // console.log('Connecting to MongoDB');
        await mongoose.connect(process.env.MONGO_URL);
        // console.log('MongoDB connected');

        const data = await req.json();
        // console.log('Request body data:', data);

        const session = await getServerSession(authOptions);
        // console.log('Session retrieved:', session);

        const email = session.user.email;
        // console.log('User email:', email);

        const result = await User.updateOne({ email }, data);
        // console.log('Update result:', result);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error in PUT request:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function GET(req) {
    // console.log('GET request received');

    try {
        // console.log('Connecting to MongoDB');
        await mongoose.connect(process.env.MONGO_URL);
        // console.log('MongoDB connected');

        const session = await getServerSession(authOptions);
        // console.log('Session retrieved:', session);

        const email = session?.user?.email;
        // console.log('User email:', email);

        if(!email){
            return Response.json(false)
        }

        const user = await User.findOne({ email });
        // console.log('User found:', user);

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error in GET request:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
