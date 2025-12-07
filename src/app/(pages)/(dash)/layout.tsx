"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  if (process.env.CHALLENGE_ACTIVE === "false") {
    return redirect("/challenge-ended");
  }

  const user = await auth();

  if (user?.user) {
    return children;
  }
  return redirect("/auth/login");
};

export default AuthenticatedLayout;
