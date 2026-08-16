import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
            redirect("/signin?callbackUrl=/admin");
      }

      if (session.user.role !== "admin") {
            redirect("/");
      }

      return (
            <section className="space-y-6 py-6 md:py-10">
                  <div>
                        <h1 className="text-2xl font-black md:text-3xl">Admin panel</h1>
                        <p className="text-sm text-base-content/60">Manage products, orders, users and reviews.</p>
                  </div>
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                        <AdminSidebar />
                        <div className="flex-1 space-y-6">{children}</div>
                  </div>
            </section>
      );
};

export default AdminLayout;
