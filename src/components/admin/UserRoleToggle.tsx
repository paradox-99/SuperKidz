'use client';

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { updateUserRole } from "@/actions/server/user";

const UserRoleToggle = ({ userId, role, isSelf }: { userId: string; role: string; isSelf: boolean }) => {
      const router = useRouter();
      const [pending, startTransition] = useTransition();

      const nextRole = role === "admin" ? "user" : "admin";

      const handleClick = () => {
            const confirmMessage = nextRole === "admin"
                  ? "Grant this user admin access?"
                  : "Remove admin access from this user?";

            if (!window.confirm(confirmMessage)) return;

            startTransition(async () => {
                  try {
                        await updateUserRole(userId, nextRole);
                        toast.success(`Role updated to ${nextRole}`);
                        router.refresh();
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Could not update role");
                  }
            });
      };

      if (isSelf) {
            return (
                  <span className="tooltip" data-tip="You cannot change your own role">
                        <button type="button" className="btn btn-outline btn-sm" disabled>
                              {role === "admin" ? "Make user" : "Make admin"}
                        </button>
                  </span>
            );
      }

      return (
            <button type="button" onClick={handleClick} className="btn btn-outline btn-sm" disabled={pending}>
                  {pending ? "Saving…" : nextRole === "admin" ? "Make admin" : "Make user"}
            </button>
      );
};

export default UserRoleToggle;
