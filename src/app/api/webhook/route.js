import mongoose from "mongoose";
import Order from "@/models/Order";

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);

    const { event, data } = await req.json();
    console.log("Received event: ", event);

    if (event === "transaction.completed") {
        const { tx_ref, status } = data;

        if (status === "successful") {
            console.loh("transacrion referance: ", tx_ref);
            const orderId = tx_ref.split('-')[1]; 
            const updatedOrder = await Order.updateOne({ _id: orderId }, { paid: true });

            if (updatedOrder.nModified > 0) {
                console.log(`Order with ID ${orderId} has been updated to paid.`);
                return new Response("Order updated successfully", { status: 200 });
            } else {
                console.log(`No order found with ID ${orderId}`);
                return new Response("Order not found", { status: 404 });
            }
        } else {
            console.log(`Transaction ${tx_ref} is not successful. Status: ${status}`);
            return new Response("Transaction not successful", { status: 400 });
        }
    } else {
        console.log(`Unhandled event type: ${event}`);
        return new Response("Event type not handled", { status: 400 });
    }
}
