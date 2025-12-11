"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-background order-1 lg:order-2">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="ACES Logo"
            width={80}
            height={80}
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Welcome to ACES</h1>
          <p className="text-muted-foreground">15-Day Learning Challenge</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Continue with your Google account to participate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              isLoading={isLoading}
              className="w-full"
              size="lg"
              variant="outline"
              onClick={handleGoogleSignIn}
            >
              <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
