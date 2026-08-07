import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInUser } from "@/actions/server/auth";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const nextAuthUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
const nextAuthSecret = process.env.NEXTAUTH_SECRET || "super-kidz-dev-secret";

process.env.NEXTAUTH_URL = nextAuthUrl;
process.env.NEXTAUTH_SECRET = nextAuthSecret;

if (!clientId || !clientSecret) {
  throw new Error("Missing Google client ID or secret in environment variables");
}

export const authOptions = {
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
  ]
}