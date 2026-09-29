import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { isAllowedEmail } from "@/lib/access";
import Dashboard from "@/components/dashboard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.email || !isAllowedEmail(session.user.email)) redirect("/sign-in");

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark">TPK</span><span>TPK Park <em>Content desk</em></span></div>
      <div className="topbar-right"><span className="account">{session.user.email}</span>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/sign-in" }); }}>
          <button className="quiet-button" type="submit">Sign out</button>
        </form>
      </div>
    </header>
    <Dashboard />
  </div>;
}
