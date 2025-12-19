import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { AppSidebar } from "./sidebar/app-sidebar";
import { Breadcrumb } from "./sidebar/breadcrumb";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  return (
    <SidebarProvider>
      <AppSidebar isAdmin={Boolean(user?.user?.isAdmin)} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pb-8 @container">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
