"use server";
import AdminDashboardLayout from "@/components/layouts/admin/admin-index";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const user = await auth();
  if (user?.user?.isAdmin) {
    return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
  }
  return redirect("/");
};

export default AdminLayout;
