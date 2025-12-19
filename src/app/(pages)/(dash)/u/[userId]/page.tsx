"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import { DOMAINS } from "@/content/domains";
import { api } from "@/queries";
import { format } from "date-fns";
import { Award, Calendar, Globe, User, CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";

export default function PublicProfilePage() {
    const params = useParams();
    const userId = params.userId as string;

    const { data: profileRes, isLoading } = api.users.useGetPublicProfile(userId);

    if (isLoading) {
        return <Loading className="py-24">Loading profile...</Loading>;
    }

    if (!profileRes?.success || !profileRes.data) {
        return (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <User className="h-16 w-16 text-muted-foreground opacity-20" />
                <h2 className="text-2xl font-bold">User not found</h2>
                <p className="text-muted-foreground text-center max-w-xs">
                    The profile you are looking for does not exist or has been removed.
                </p>
            </div>
        );
    }

    const { user, participant, submissions } = profileRes.data;
    const domainTitle = DOMAINS.find((d) => d.id === participant?.domain)?.title || "Participant";

    return (
        <div className="flex-1 space-y-6 ">
            {/* Header Profile Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border p-6 md:p-10">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
                    <User className="h-32 w-32" />
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                    <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                            <AvatarFallback className="text-4xl bg-primary text-primary-foreground font-bold">
                                {user.name?.slice(0, 2).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        {user.isOnboarded && (
                            <div className="absolute bottom-1 right-1 bg-background rounded-full p-1 shadow-md">
                                <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-500/10" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-3">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{user.name}</h1>
                            <p className="text-muted-foreground mt-1">Challenge Participant</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                                {domainTitle}
                            </Badge>
                            {participant && (
                                <Badge variant="outline" className="px-3 py-1 text-sm font-mono">
                                    ID: {participant.techfestId}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Participation Card */}
                <Card className="md:col-span-1 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Participation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {user.schoolName && (
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">School / Institute</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{user.schoolName}</span>
                                </div>
                            </div>
                        )}
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">Member Since</p>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{format(new Date(user.createdAt), "PPP")}</span>
                            </div>
                        </div>
                        {participant && (
                            <div className="pt-4 border-t space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">Challenge Joined</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{format(new Date(participant.createdAt), "PPP")}</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Activity & Submissions */}
                <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="bg-primary/5 border-primary/20 shadow-none">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                                        <p className="text-3xl font-bold">{submissions?.length || 0}</p>
                                    </div>
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-sm overflow-hidden">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle>Challenge Activity</CardTitle>
                            <CardDescription>Latest submissions for the 15 Days Learning Challenge</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {submissions && submissions.length > 0 ? (
                                <div className="divide-y">
                                    {submissions.map((sub: any) => (
                                        <div key={sub.id} className="p-4 hover:bg-muted/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="space-y-1 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">Day {sub.day}</span>
                                                    <span className="text-xs text-muted-foreground">{format(new Date(sub.createdAt), "MMM d, yyyy")}</span>
                                                </div>
                                                <p className="text-sm font-medium line-clamp-2 mt-1">{sub.summary}</p>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <a
                                                    href={sub.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-semibold text-primary px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors"
                                                >
                                                    View Link
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-12 px-4">
                                    <Globe className="h-10 w-10 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm">No submissions yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
