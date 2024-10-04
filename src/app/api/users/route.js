import User from "@/models/User";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function GET(request) {
  await mongoose.connect(process.env.MONGO_URL);

  const url = new URL(request.url);
  const userId = url.searchParams.get('_id'); // Extract the '_id' parameter from the URL

  let users;
  if (userId) {
    users = await User.findById(userId);
  } else if ( await isAdmin()) {
      users = await User.find();
  }  
  return Response.json(users);
}
