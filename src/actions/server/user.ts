"use server";

import { getCollection } from "@/lib/dbConfig";
import { ObjectId } from "mongodb";
import { requireAdmin } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";

const validRoles = ["user", "admin"] as const;

export const getAllUsers = async () => {
      await requireAdmin();

      const users = await getCollection("USERS")
            .find({}, { projection: { password: 0 } })
            .sort({ createdAt: -1 })
            .toArray();

      return users.map((user) => ({
            _id: user._id.toString(),
            name: user.name as string,
            email: user.email as string,
            image: (user.image as string | undefined) ?? null,
            provider: user.provider as string | undefined,
            role: (user.role as string) ?? "user",
            createdAt: user.createdAt as Date,
      }));
};

export const updateUserRole = async (userId: string, role: string) => {
      const admin = await requireAdmin();

      if (!ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
      }

      if (!validRoles.includes(role as typeof validRoles[number])) {
            throw new Error("Invalid role");
      }

      if (userId === admin.id) {
            throw new Error("You cannot change your own role");
      }

      const result = await getCollection("USERS").updateOne(
            { _id: new ObjectId(userId) },
            { $set: { role, updatedAt: new Date() } }
      );

      if (result.matchedCount === 0) {
            throw new Error("User not found");
      }

      revalidatePath("/admin/users");

      return { status: "success" };
};
