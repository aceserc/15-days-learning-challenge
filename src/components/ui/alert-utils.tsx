"use client";

import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AlertProps = {
  title: ReactNode;
  description?: ReactNode;
  actionText?: ReactNode;
  cancelText?: ReactNode;
  variant?: "default" | "destructive";
};

type ConfirmProps = AlertProps & {};

export const confirm = ({
  title,
  description,
  actionText = "Continue",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmProps): Promise<boolean> => {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const root = createRoot(div);

    const cleanup = () => {
      root.unmount();
      div.remove();
    };

    const handleAction = () => {
      resolve(true);
      // Wait for animation if possible, but for now just cleanup
      setTimeout(cleanup, 100);
    };

    const handleCancel = () => {
      resolve(false);
      setTimeout(cleanup, 100);
    };

    const Component = (
      <AlertDialog
        defaultOpen={true}
        onOpenChange={(open) => !open && handleCancel()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleAction();
              }}
              className={
                variant === "destructive"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              {actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    root.render(Component);
  });
};

export const alert = ({
  title,
  description,
  actionText = "Ok",
}: AlertProps): Promise<true> => {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const root = createRoot(div);

    const cleanup = () => {
      root.unmount();
      div.remove();
    };

    const handleAction = () => {
      resolve(true);
      setTimeout(cleanup, 100);
    };

    const Component = (
      <AlertDialog
        defaultOpen={true}
        onOpenChange={(open) => !open && handleAction()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAction}>
              {actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    root.render(Component);
  });
};
