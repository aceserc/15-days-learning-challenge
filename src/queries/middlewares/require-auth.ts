import { auth } from "@/lib/auth";

export const getAuth = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User is not authenticated");
  }
  
  // Return user with guaranteed id (TypeScript type assertion is safe here due to above check)
  return session.user as Required<typeof session.user> & { id: string };
};
