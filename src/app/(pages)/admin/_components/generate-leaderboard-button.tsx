"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function GenerateLeaderboardButton() {
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/leaderboard/gen");
            const data = await response.json();

            if (data.success) {
                toast.success("Leaderboard generated successfully!");
            } else {
                toast.error("Failed to generate leaderboard");
            }
        } catch (error) {
            toast.error("An error occurred while generating leaderboard");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleGenerate} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Generating..." : "Calculate Leaderboard"}
        </Button>
    );
}
