import DashboardLayout from "@/components/layouts/dashboard";
import { auth } from "@/lib/auth";
import { Guideline } from "./_components/guideline";
import fs from "fs/promises";
import path from "path";

const Page = async () => {
  const session = await auth();

  // Read the markdown file
  const filePath = path.join(process.cwd(), "src/content/md/guidelines.md");
  let content = "";
  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading guideline file:", error);
    content = "# Error loading guidelines";
  }

  if (session?.user) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto py-8">
          <Guideline content={content} />
        </div>
      </DashboardLayout>
    );
  }
  return (
    <div className="container max-w-4xl mx-auto py-12">
      <Guideline content={content} />
    </div>
  );
};

export default Page;
