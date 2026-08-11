import { withAuth } from "next-auth/middleware"

export const config = {
  matcher: ["/about", "/dashboard", "/latest", "/products", "/resources", "/team", "/"],
}

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/login',
    error: '/login',
  }
})