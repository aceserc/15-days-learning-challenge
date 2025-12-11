import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ComponentProps } from "react";

export const Loading = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "py-12 flex flex-col items-center justify-center space-y-4",
      className
    )}
    {...props}
  >
    <Loader2 className="size-8 animate-spin text-primary" />
    <p className="text-muted-foreground animate-pulse">{children}</p>
  </div>
);
