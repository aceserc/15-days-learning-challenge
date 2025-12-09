import { Sidebar } from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
        <Sidebar className="sticky top-0 h-screen" />
      </div>
      <main className="flex-1 pt-6 px-8 pb-12">{children}</main>
    </div>
  );
}
