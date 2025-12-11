"use client";
import { usePathname } from "next/navigation";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segment = pathname
    .split("/")
    .filter((segment) => segment !== "")
    .pop();
  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        {segment ? (
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};

export { Breadcrumb };
