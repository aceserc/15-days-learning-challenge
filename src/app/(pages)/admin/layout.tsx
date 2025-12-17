"use server";
import AdminDashboardLayout from "@/components/layouts/dashboard/admin-index";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const ADMIN_EMAILS = process.env.ADMIN_EMAILS

  const user = await auth();
  if (user?.user?.email && ADMIN_EMAILS?.includes(user.user.email)) {
    return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
  }
  return redirect("/auth/login");
};

export default AdminLayout;
