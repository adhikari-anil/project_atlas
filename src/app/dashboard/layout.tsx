import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { getCurrentUser } from "@/services";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavbar user={user} />
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
