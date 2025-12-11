"use server";
import { redirect } from "next/navigation";
import type React from "react";
import DashboardLayout from "@/components/layouts/dashboard";
import { auth } from "@/lib/auth";

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
    return <DashboardLayout>{children}</DashboardLayout>;
  }
  return redirect("/auth/login");
};

export default AuthenticatedLayout;
