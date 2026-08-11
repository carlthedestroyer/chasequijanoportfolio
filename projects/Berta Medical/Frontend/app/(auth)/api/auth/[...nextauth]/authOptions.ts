import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        // Google({
        //     clientId: "464752714405-lgjrd64e4d05ld0v1khfmth4h8rf2r18.apps.googleusercontent.com",
        //     clientSecret: "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",
        // }),
        Credentials({
            id: "credentials",
            name: "credentials",
            credentials: {
                username: { 
                    label: "Username", 
                    type: "text", 
                    placeholder: "Username" 
                },
                
                password: {  
                    label: "Password", 
                    placeholder: "Password",
                    type: "Password" 
                },
            },
            async authorize(credentials) {
                const user = { id : 1, username : 'admin' , password : 'bertaadmin'};
                if ((!credentials?.username || !credentials?.password) || (credentials.username !== user.username || credentials.password !== user.password)) {
                    throw new Error("Invalid Credentials")
                }
                if (credentials.username == user.username && credentials.password == user.password && user.id == 1) {
                    console.log("Login Successful");
                    return { id: credentials.username};
                }
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
}