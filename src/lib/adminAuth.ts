import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const requireAdmin = async () => {
      const session = await getServerSession(authOptions);
      const user = session?.user;

      if (!user || user.role !== "admin") {
            throw new Error("Not authorized");
      }

      return user;
};
