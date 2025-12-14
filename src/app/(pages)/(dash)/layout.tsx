"use server";
import DashboardLayout from "@/components/layouts/dashboard";
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
  console.log(user)
  if (!user?.user?.isOnboarded) {
    return redirect("/onboarding");
  }

  if (user?.user) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }
  return redirect("/auth/login");
};

export default AuthenticatedLayout;
