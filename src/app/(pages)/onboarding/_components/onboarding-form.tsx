"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/queries";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { confirm } from "@/components/ui/alert-utils";

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    schoolName: z.string().min(2, "School name must be at least 2 characters"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
});

interface OnboardingFormProps {
    user: {
        name?: string | null;
        email?: string | null;
    };
}

export function OnboardingForm({ user }: OnboardingFormProps) {
    const router = useRouter();
    const updateProfile = api.onboarding.useUpdateProfile()
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name || "",
            schoolName: "",
            phoneNumber: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        try {
            await updateProfile.mutateAsync(data)
            toast.success("Profile updated successfully")
            router.replace("/")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const onLogout = async () => {
        const shouldLogout = await confirm({
            title: "Logout!",
            description: "Are you sure you want to logout and switch accounts?",
            variant: "destructive",
            actionText: "Logout & Switch",
        });
        if (shouldLogout) {
            await signOut();
        }
    };



    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm border">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold">Welcome Onboard!</h1>
                <p className="text-gray-500">Let's set up your profile.</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* Email - Read Only */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                        <Input value={user.email || ""} disabled className="bg-gray-100" />
                        <p className="text-[0.8rem] text-muted-foreground">Used for login, cannot be changed here.</p>
                    </div>

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="schoolName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>School / College Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the name of your school or college. This information helps us identify your academic institution later.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Provide a valid phone number for verification purposes. A working number is required to ensure prizes can be distributed to you.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="space-y-3">
                        <Button type="submit" className="w-full font-bold h-11" isLoading={updateProfile.isPending}>
                            Verify & Finish
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onLogout}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 font-medium w-full"
                        >
                            <LogOut className="h-3.5 w-3.5" />
                            Not you? Switch account
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
