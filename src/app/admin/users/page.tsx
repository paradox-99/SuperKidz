import Image from "next/image";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getAllUsers } from "@/actions/server/user";
import UserRoleToggle from "@/components/admin/UserRoleToggle";

export const metadata: Metadata = {
      title: "Admin · Users",
};

const AdminUsersPage = async () => {
      const [session, users] = await Promise.all([
            getServerSession(authOptions),
            getAllUsers(),
      ]);

      return (
            <div className="rounded-4xl border border-base-200 bg-base-100 p-6 shadow-lg md:p-8">
                  <h2 className="mb-5 text-lg font-bold">Users ({users.length})</h2>

                  <div className="overflow-x-auto">
                        <table className="table">
                              <thead>
                                    <tr>
                                          <th>User</th>
                                          <th>Email</th>
                                          <th>Role</th>
                                          <th>Joined</th>
                                          <th className="text-right">Actions</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {users.map((user) => (
                                          <tr key={user._id}>
                                                <td>
                                                      <div className="flex items-center gap-3">
                                                            {user.image ? (
                                                                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                                                                        <Image src={user.image} alt={user.name} fill sizes="36px" unoptimized className="object-cover" />
                                                                  </div>
                                                            ) : (
                                                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                                        {user.name?.charAt(0).toUpperCase() ?? "?"}
                                                                  </div>
                                                            )}
                                                            <span className="font-semibold">{user.name}</span>
                                                      </div>
                                                </td>
                                                <td>{user.email}</td>
                                                <td>
                                                      <span className={`badge capitalize ${user.role === "admin" ? "badge-primary" : "badge-outline"}`}>
                                                            {user.role}
                                                      </span>
                                                </td>
                                                <td>
                                                      {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </td>
                                                <td>
                                                      <div className="flex justify-end">
                                                            <UserRoleToggle userId={user._id} role={user.role} isSelf={user._id === session?.user?.id} />
                                                      </div>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
};

export default AdminUsersPage;
