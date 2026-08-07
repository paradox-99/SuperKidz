"use server"

import { getCollection } from "@/lib/dbConfig";
import bycrypt from "bcryptjs";

export const postUser = async (user: { name: string; email: string; password: string }) => {

      if (!user.name || !user.email || !user.password) {
            throw new Error("Missing required fields");
      }

      
      const isUserExists = await getCollection("USERS").findOne({ email: user.email });
      if (isUserExists) {
            throw new Error("User already exists");
      }

      const hashedPassword = await bycrypt.hash(user.password, 14);

      const newUser = {
            provider: "credentials",
            name: user.name,
            email: user.email,
            password: hashedPassword, // Store the hashed password
            role: "user",
            createdAt: new Date(),
            updatedAt: new Date(),
      };

      const response = await getCollection("USERS").insertOne(newUser);

      if(response.acknowledged) {
            return {
            status: "success",
            _id: response.insertedId.toString(),
      };
      } else {
            throw new Error("Failed to create user");
      }
      

      
}