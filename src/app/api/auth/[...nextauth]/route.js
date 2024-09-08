import mongoose from "mongoose";
import NextAuth from "next-auth";
import User from "@/models/User";
import bcrypt from 'bcrypt'; 
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '../../../../libs/mongoConnect'



const handler = NextAuth({
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
          await mongoose.connect(process.env.MONGO_URL); // Ensure connection is established
          const user = await User.findOne({ email: credentials.email });

          if (user && await bcrypt.compare(credentials.password, user.password)) {
            return user;
          }

          return null; // Return null if user not found or password incorrect
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      }
    })
  ]
});

export { handler as GET, handler as POST };
