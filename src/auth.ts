import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/dbConnect";
import User from "@/lib/models/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {strategy: "jwt"},
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        await connectDB()
        const user = await User.findOne({ email: credentials.email })
        if(!user || !user.password) return null

        const valid = await bcrypt.compare(credentials.password as string, user.password)
        if(!valid) return null

        return { id: user._id.toString(), name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if(account?.provider === "google") {
        await connectDB()
        const existing = await User.findOne({ email: user.email })
        if(!existing) {
          await User.create({ name: user.name, email:user.email, provider: "google"})
        }
      }
      return true
    },
  },
})