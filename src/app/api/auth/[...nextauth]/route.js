import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import User from "@/models/User";
import bcrypt from 'bcrypt'; 
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/libs/mongoConnect';

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Ensure the mongoose connection is established
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URL);
          }
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            throw new Error("No user found with this email");
          }
          
          // Check password
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
          }

          // Return essential user data
          const { _id, email, name } = user;
          return { id: _id, email, name };

        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      }
    })
  ]
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await User.findOne({email: userEmail})
  console.log("user info to check amdin: ", userInfo);
  if(!userInfo) {
    return false;
  }

  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
