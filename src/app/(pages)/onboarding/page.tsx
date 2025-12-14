import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { OnboardingForm } from "@/app/(pages)/onboarding/_components/onboarding-form";

export default async function OnboardingPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/auth/login");
    }

    if (session.user.isOnboarded) {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <OnboardingForm user={session.user} />
        </div>
    );
}
