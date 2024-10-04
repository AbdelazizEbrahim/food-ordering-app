import Category from "@/models/Category";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const requestBody = await req.json();
    if (await isAdmin()) {
        const { name } = requestBody; 
        const categoryDoc = await Category.create({ name });
        return Response.json(categoryDoc);
    } else {
        return Response.json({});
    }
}

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const requestBody = await req.json();
    if(await isAdmin()) {
        const { name, _id } = requestBody; 
        const updateResult = await Category.updateOne({ _id }, { name });
        return Response.json(updateResult);
    } else {
        return Response.json({});
    }
}


export async function GET(req){
    await mongoose.connect(process.env.MONGO_URL);

    return Response.json(
        await Category.find()
    )
}

export async function  DELETE(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if(await isAdmin()) {
        await Category.deleteOne({_id});
    }
    return Response.json(true);
}