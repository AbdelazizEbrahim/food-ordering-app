import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Order from "@/models/Order";
import { MenuItem } from "@/models/MenuItem";
import { NextResponse } from "next/server";

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);

    const { cartProducts, address } = await req.json();
    console.log("Address: ", address);
    
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const productsInfo = [];

    for (const cartProduct of cartProducts) {
        let productPrice = Number(cartProduct.price) || 0; 
        const productName = cartProduct.itemName;

        if (cartProduct.size) {
            const size = cartProduct.size;
            const sizePrice = Number(size.price) || 0; 
            productPrice += sizePrice;
            console.log(`Added size price: ${sizePrice}. Updated product price: ${productPrice}`);
        }

        if (cartProduct.extras?.length > 0) {
            for (const extra of cartProduct.extras) {
                const extraPrice = Number(extra.price) || 0;
                productPrice += extraPrice;
                console.log(`Added extra price: ${extraPrice}. Updated product price: ${productPrice}`);
            }
        } else {
            console.log(`No extras found for product ID: ${cartProduct._id}`);
        }

        console.log(`Product Info:`, { id: cartProduct._id, name: productName, price: productPrice });
        productsInfo.push({ name: productName, price: productPrice });
    }

    console.log("Products Info: ", productsInfo);

    const orderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts: productsInfo,  
        paid: false,
    });

    console.log("Order document created: ", orderDoc);

    let totalAmount = productsInfo.reduce((total, product) => total + product.price, 0); 
    totalAmount += 50; // Adding a delivery fee
    console.log("Order total price: ", totalAmount);

    const [first_name, last_name] = address.name.split(" ");
    console.log("First Name: ", first_name);
    console.log("Last Name: ", last_name);

    const chapaData = JSON.stringify({
        amount: totalAmount, 
        currency: "ETB",
        email: userEmail,
        first_name,  
        last_name,   
        tx_ref: `tx-${orderDoc._id}`,  
        callback_url: "https://718f-196-190-90-211.ngrok-free.app/api/webhook",
        return_url: `http://localhost:3000/thankYou?order_id=${orderDoc._id}`, 
        customizations: {
            title: "Food Order Payment",
            description: "Payment for your order with delivery",
        },
    });

    console.log("Chapa full data: ", chapaData);

    const chapaHeaders = {
        "Authorization": `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch("https://api.chapa.co/v1/transaction/initialize", {
            method: 'POST',
            headers: chapaHeaders,
            body: chapaData,
        });

        const data = await response.json();
        console.log("Data from checkout: ", data);

        if (data.status === "success") {
            return NextResponse.json({ checkout_url: data.data.checkout_url });
        } else {
            return NextResponse.json({ message: "Payment initialization failed", error: data });
        }
    } catch (error) {
        return NextResponse.json({ message: "Payment initiation failed", error });
    }
}
