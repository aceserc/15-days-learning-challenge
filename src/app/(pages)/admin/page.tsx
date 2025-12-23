import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminCharts from "./_components/admin-charts";
import AdminStats from "./_components/admin-stats";
import ParticipantsList from "./_components/participants-list";
import UsersList from "./_components/users-list";

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 ">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <AdminStats />
      <AdminCharts />
      <ParticipantsList />
    </div>
  );
}
