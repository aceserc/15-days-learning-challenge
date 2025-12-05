import { redirect } from "next/navigation";

export default function HomePage() {
  // This will be handled by middleware
  // If not logged in -> /auth/login
  // If logged in -> /home
  redirect("/home");
}
