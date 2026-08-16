'use client';

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

const AdminDeleteButton = ({
      id,
      action,
      confirmMessage,
      label = "Delete",
}: {
      id: string;
      action: (id: string) => Promise<{ status: string }>;
      confirmMessage: string;
      label?: string;
}) => {
      const router = useRouter();
      const [pending, startTransition] = useTransition();

      const handleClick = () => {
            if (!window.confirm(confirmMessage)) return;

            startTransition(async () => {
                  try {
                        await action(id);
                        toast.success("Deleted");
                        router.refresh();
                  } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Could not delete");
                  }
            });
      };

      return (
            <button
                  type="button"
                  onClick={handleClick}
                  className="btn btn-outline btn-error btn-sm"
                  disabled={pending}
            >
                  {pending ? "Deleting…" : label}
            </button>
      );
};

export default AdminDeleteButton;
