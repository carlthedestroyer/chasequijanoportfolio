import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { authOptions } from "./authOptions"


// Client ID: 464752714405-lgjrd64e4d05ld0v1khfmth4h8rf2r18.apps.googleusercontent.com

// Client Secret: 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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }