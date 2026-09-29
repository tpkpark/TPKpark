import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { isAllowedEmail } from "@/lib/access";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const session = await auth();
  if (isAllowedEmail(session?.user?.email)) redirect("/");
  const signInReady = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET &&
    process.env.AUTH_SECRET && process.env.TPK_CONTENT_SHEET_ID && process.env.TPK_CONTENT_ALLOWED_EMAILS);
  return <main className="sign-in-page">
    <div className="sign-in-card">
      <div className="brand"><span className="brand-mark">TPK</span><span>TPK Park</span></div>
      <p className="eyebrow">Private workspace</p>
      <h1>Content desk</h1>
      <p>See tenant submissions, channel decisions, publication links and items needing review in one place.</p>
      {signInReady ? <form action={async () => { "use server"; await signIn("google", { redirectTo: "/" }); }}>
        <button className="primary-button" type="submit">Continue with Google Workspace <span aria-hidden="true">↗</span></button>
      </form> : <p role="status">Staff sign-in is being set up. Please check back shortly.</p>}
      <small>Access is limited to approved TPK Park staff accounts.</small>
    </div>
  </main>;
}
