"use server";
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
  return children;
};

export default AuthenticatedLayout;
