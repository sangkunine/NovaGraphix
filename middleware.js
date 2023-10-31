export { default } from "next-auth/middleware";

export const config = {
    matcher: [ "/profile", "/marketplace" ],
    // matcher: [ "/((?!register|api|login).*)" ],
}