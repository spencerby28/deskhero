import DashboardSidebar from "@/components/sidebar";
import { UserProvider } from "@/contexts/UserContext";
import { getUser } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserProvider initialUser={user}>
      <div className="flex h-screen">   
        <DashboardSidebar user={user} />
        <div className="flex-1">{children}</div>
      </div>
    </UserProvider>
  );
}