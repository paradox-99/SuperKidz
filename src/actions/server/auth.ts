"use server"

import { getCollection } from "@/lib/dbConfig";
import bycrypt from "bcryptjs";
import type { User } from "next-auth";

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

      if (response.acknowledged) {
            return {
                  status: "success",
                  _id: response.insertedId.toString(),
            };
      } else {
            throw new Error("Failed to create user");
      }
}

export const signInUser = async (email: string, password: string): Promise<User> => {

      if (!email || !password) {
            throw new Error("Missing required fields");
      }

      const user = await getCollection("USERS").findOne({ email });

      if (!user) {
            throw new Error("User not found");
      }

      const isPasswordValid = await bycrypt.compare(password, user.password);

      if (!isPasswordValid) {
            throw new Error("Invalid password");
      }

      return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
      };
}     