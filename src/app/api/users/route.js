import User from "@/models/User";
import mongoose from "mongoose";

export async function GET(request) {
  await mongoose.connect(process.env.MONGO_URL);

  const url = new URL(request.url);
  const userId = url.searchParams.get('_id'); // Extract the '_id' parameter from the URL

  let users;
  if (userId) {
    // Fetch a specific user if the '_id' query parameter is provided
    users = await User.findById(userId);
  } else {
    // Fetch all users if no '_id' query parameter is provided
    users = await User.find();
  }

  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
}
