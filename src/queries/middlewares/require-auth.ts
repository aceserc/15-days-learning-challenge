import { auth } from "@/lib/auth";

export const getAuth = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }
  return session.user!;
};
