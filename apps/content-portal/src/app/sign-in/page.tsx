import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { isAllowedEmail } from "@/lib/access";

export default async function SignInPage() {
  const session = await auth();
  if (isAllowedEmail(session?.user?.email)) redirect("/");
  return <main className="sign-in-page">
    <div className="sign-in-card">
      <div className="brand"><span className="brand-mark">TPK</span><span>TPK Park</span></div>
      <p className="eyebrow">Private workspace</p>
      <h1>Content desk</h1>
      <p>See tenant submissions, channel decisions, publication links and items needing review in one place.</p>
      <form action={async () => { "use server"; await signIn("google", { redirectTo: "/" }); }}>
        <button className="primary-button" type="submit">Continue with Google Workspace <span aria-hidden="true">↗</span></button>
      </form>
      <small>Access is limited to approved TPK Park staff accounts.</small>
    </div>
  </main>;
}
