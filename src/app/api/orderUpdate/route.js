import mongoose from "mongoose";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req) {
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id'); // Extract _id from the URL
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
    let isAdmin;

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    if(_id) {
        return Response.json( await Order.findById(_id));
    }

    if (userEmail) {
        const userInfo = await User.findOne({email: userEmail});
        if(userInfo) {
            isAdmin = userInfo.admin;
        }
    }

    if(isAdmin) {
        return Response.json(await Order.findOne());
    }

    if(userEmail) {
        return Response.json(await Order.find(userEmail))
    }
}
