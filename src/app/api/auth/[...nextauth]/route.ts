import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// This is a stub configuration. 
// A full implementation requires a valid Prisma Database connection to query users.
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Mock authorization for now since DB is pending
                if (credentials?.email === "test@example.com" && credentials.password === "password") {
                    return { id: "1", name: "Test User", email: "test@example.com" };
                }
                return null; // Return null if user data could not be retrieved
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
});

export { handler as GET, handler as POST };
