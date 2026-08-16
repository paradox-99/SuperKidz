import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInUser } from "@/actions/server/auth";
import { getCollection } from "./dbConfig";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextAuthUrl = process.env.NEXTAUTH_URL || "https://super-kidz-tau.vercel.app/";
const nextAuthSecret = process.env.NEXTAUTH_SECRET || "super-kidz-dev-secret";

process.env.NEXTAUTH_URL = nextAuthUrl;
process.env.NEXTAUTH_SECRET = nextAuthSecret;

if (!clientId || !clientSecret) {
  throw new Error("Missing Google client ID or secret in environment variables");
}

export const authOptions: NextAuthOptions = {
  secret: nextAuthSecret,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        const user = await signInUser(email, password);
        return user;
      }
    }),

    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      const isExistingUser = await getCollection("USERS").findOne({ email: user.email });
      if (!isExistingUser) {
        // Create a new user
        const result = await getCollection("USERS").insertOne({
          provider: account?.provider,
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date()
        });
        return result.acknowledged; // Return true if the user was created successfully
      }

      return true;

    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, token, user }) {
      // console.log("User in session callback:", user);
      if (token) {
        session.id = token?.id;
        session.role = token?.role;
        if (session.user) {
          session.user.id = token?.id;
          session.user.role = token?.role;
        }
      }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("User in JWT callback:", user);
      // console.log("Token in JWT callback:", token);

      if (user) {
        if (account?.provider === "google") {
          const dbUser = await getCollection("USERS").findOne({ email: user.email });
          token.id = dbUser?._id.toString();
          token.role = dbUser?.role;
        } else {
          token.id = user?.id;
          token.role = user?.role;
        }
      }
      return token
    }
  }
}