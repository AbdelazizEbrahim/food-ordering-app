import { MenuItem } from "@/models/MenuItem";
import { NextResponse } from 'next/server';
import mongoose from "mongoose";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    console.log("posting .... ", data);
    const menuItemDoc = await MenuItem.create(data);
    if(menuItemDoc){
      console.log("menu item: ", menuItemDoc);
    }
    return Response.json(menuItemDoc);
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
   const {_id, ...data} = await req.json();
   console.log("Data to update: ", data);
   const updateItem = await MenuItem.findByIdAndUpdate(_id, data, { new: true });
  
   if (updateItem) {
      console.log("Updated menu item: ", updateItem);
  } else {
      console.log("No menu item found with this ID.");
  }
  
  return Response.json(updateItem);
}


export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(
    await MenuItem.find()
  );
}

export async function  DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await MenuItem.deleteOne({_id});
  return Response.json(true);
}
  
