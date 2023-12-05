import { authorizeUser } from "@/utils/notionDB";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        // # Google Credentials
        // https://console.cloud.google.com/apis/credentials 에서
        // sangkunine 로그인 ==> Credentials의 NovaGraphix를 클릭 ==> Client ID + Client secret 를 확인
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // # Github Credentials
        // https://github.com/settings/applications/2353950 에서
        // sangkunine 로그인 ==> nextauth-nova ==> Client ID + Client secrets 를 확인
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@domain.com",
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your password"
                },
            },
            async authorize( credentials )
            {
                if( !credentials?.email || !credentials.password ) {
                    return null;
                }

                return authorizeUser( credentials.email, credentials.password );
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    // anykey: token.anykey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user;
                return {
                    ...token,
                    id: u.id,
                    // anykey: u.anykey,
                };
            }
            return token;
        },
    },
}