import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import client from "@/config/db";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface DBUser {
  id: string;
  email: string;
  name: string;
  password: string; // Required for password validation but NOT returned
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const res = await client.query("SELECT * FROM users WHERE email = $1", [
          credentials.email,
        ]);
        const user: DBUser | undefined = res.rows[0];

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // Return only necessary user data (excluding password)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        } as NextAuthUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
        token.email = user.email; // Ensure correct type for NextAuth
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string, // Explicitly cast for NextAuth compatibility
        name: token.name as string,
      };
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
