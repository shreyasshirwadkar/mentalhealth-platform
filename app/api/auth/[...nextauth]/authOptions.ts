import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import client from "@/config/db";
import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface DBUser {
  id: string;
  email: string;
  name: string;
  password: string; // Not needed in JWT or session
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

        // ✅ Remove password before returning user
        return { id: user.id, email: user.email, name: user.name } as User;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
      };
      return session;
    },
  },
};
