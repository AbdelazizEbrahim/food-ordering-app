import Category from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req) {
    // Log that the POST request was received
    console.log("Received POST request");

    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Log request body before parsing
    const requestBody = await req.json();
    console.log("Request Body:", requestBody);

    const { name } = requestBody; 
    console.log("Category Name:", name);

    const categoryDoc = await Category.create({ name });

    // Log the created document
    console.log("Category created:", categoryDoc);

    return Response.json(categoryDoc);
}

export async function PUT(req) {
    // Log that the PUT request was received
    console.log("Received PUT request");

    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Log request body before parsing
    const requestBody = await req.json();
    console.log("Request Body:", requestBody);

    const { name, _id } = requestBody; 
    console.log("Category ID:", _id);
    console.log("New Category Name:", name);

    const updateResult = await Category.updateOne({ _id }, { name });

    // Log the result of the update operation
    console.log("Update Result:", updateResult);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}


export async function GET(req){
    mongoose.connect(process.env.MONGO_URL);

    return Response.json(
        await Category.find()
    )
}

export async function  DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Category.deleteOne({_id});
    return Response.json(true);
}