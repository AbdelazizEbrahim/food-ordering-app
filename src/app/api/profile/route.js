import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  
  const data = await req.json();
  console.log("dataaa: ", data);
  const { _id, ...dataToUpdate } = data; // Extract _id and the rest of the data

  let filter = {};
  if (_id) {
    filter = { _id };  // Use the provided _id to filter the user
  } else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };  // Fallback to filter by email if _id is not provided
  }

  // Update the user based on the provided filter
  const updateResult = await User.updateOne(filter, { $set: dataToUpdate }); // Ensure proper update syntax

  if (updateResult.modifiedCount === 0) {
    return new Response(JSON.stringify({ success: false, message: "No user found or no changes made" }), { status: 404 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }

  // Fetch only from User model and return the user data
  const user = await User.findOne(filterUser).lean();

  return Response.json(user);
}
