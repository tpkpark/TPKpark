import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isAllowedGoogleProfile, workspaceDomain } from "@/lib/access";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google({
    authorization: {
      params: {
        scope: "openid email profile https://www.googleapis.com/auth/spreadsheets.readonly",
        access_type: "offline",
        prompt: "consent",
        hd: workspaceDomain
      }
    }
  })],
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/sign-in" },
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider !== "google" || !profile) return false;
      return isAllowedGoogleProfile(profile as {
        email?: string;
        email_verified?: boolean;
        hd?: string;
      });
    },
    jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile) {
        token.hostedDomain = (profile as { hd?: string }).hd;
        token.googleAccessToken = account.access_token;
        token.googleRefreshToken = account.refresh_token;
        token.googleExpiresAt = account.expires_at;
      }
      return token;
    }
  }
});

declare module "next-auth/jwt" {
  interface JWT {
    hostedDomain?: string;
    googleAccessToken?: string;
    googleRefreshToken?: string;
    googleExpiresAt?: number;
  }
}
