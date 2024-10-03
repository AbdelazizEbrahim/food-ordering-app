import mongoose from "mongoose";
import Order from "@/models/Order";

export async function PUT(req) {
    const { _id, paid } = await req.json();
    console.log("id and paid: ", _id, paid);

    const updatedOrder = await Order.findOneAndUpdate(
        { _id },
        { paid },
        { new: true }
    );

    console.log("updated order: ", updatedOrder);
    return new Response(JSON.stringify(updatedOrder), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
