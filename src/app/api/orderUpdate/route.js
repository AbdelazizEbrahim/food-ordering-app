import mongoose from "mongoose";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route";

export async function PUT(req) {
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id'); 
    const { paid } = await req.json();
    
    if (!_id || paid === undefined) {
      return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
    }
  
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id },
        { paid },
        { new: true }
      );
  
      if (!updatedOrder) {
        return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
      }
  
      return new Response(JSON.stringify(updatedOrder), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error updating order" }), { status: 500 });
    }
  }
  

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if(_id) {
        return Response.json( await Order.findById(_id));
    }

    if(admin) {
        return Response.json(await Order.find());
    }

    if(userEmail) {
        return Response.json(await Order.find({userEmail}))
    }
}
