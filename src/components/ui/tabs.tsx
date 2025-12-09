"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const TabsContext = React.createContext<{
  variant: "default" | "underline" | "pills" | "outline";
}>({
  variant: "default",
});

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted p-[3px] h-9 w-fit",
        underline:
          "bg-transparent w-full justify-start border-b rounded-none p-0 h-auto space-x-6",
        pills: "bg-transparent w-fit gap-2 h-auto p-0",
        outline: "bg-transparent border rounded-md p-1 w-fit h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "px-3 py-1.5 shadow-sm bg-background text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm not-first:ml-2 ",
        underline:
          "rounded-none border-b-2 border-transparent px-2 py-2 data-[state=active]:border-primary data-[state=active]:text-primary shadow-none bg-transparent hover:text-foreground/80 data-[state=active]:shadow-none",
        pills:
          "rounded-full px-4 py-2 border bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm hover:bg-muted",
        outline:
          "px-4 py-2 hover:bg-muted data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof tabsListVariants> {}

function Tabs({ className, variant = "default", ...props }: TabsProps) {
  return (
    <TabsContext.Provider value={{ variant: variant || "default" }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant } = React.useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none mt-2", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
