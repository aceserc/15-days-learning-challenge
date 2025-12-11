import DashboardLayout from "@/components/layouts/dashboard";
import { auth } from "@/lib/auth";
import { Guideline } from "./_components/guideline";

const Page = async () => {
  const session = await auth();
  if (session?.user) {
    return (
      <DashboardLayout>
        <Guideline />
      </DashboardLayout>
    );
  }
  return (
    <div className="container">
      <Guideline />
    </div>
  );
};

export default Page;
