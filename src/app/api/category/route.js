import Category from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    console.log('Incoming request:', req); // Log the incoming request

    const { name } = await req.json(); // Assuming body is in JSON format
    console.log('Category name:', name); // Log the extracted name

    const categoryDoc = await Category.create({ name });
    console.log('Category document created:', categoryDoc); // Log the created document

    return Response.json(categoryDoc);
}
export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);

    const { name, _id } = await req.json(); // Destructure directly from the parsed JSON

    console.log("id and name: ", name, _id);
    await Category.updateOne({ _id }, { name }); // Update the category
    return new Response(JSON.stringify({ success: true }), { status: 200 }); // Return success response
}


export async function GET(req){
    mongoose.connect(process.env.MONGO_URL);

    return Response.json(
        await Category.find()
    )
}