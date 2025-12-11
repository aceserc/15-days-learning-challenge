"use client";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

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
