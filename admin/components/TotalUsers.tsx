import { Users } from "lucide-react";

export function TotalUsersCard({ totalUsers, growthPercent }: { totalUsers: number, growthPercent: number }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border p-5 bg-card shadow-sm">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        <span className="text-lg font-semibold">Registered Users</span>
      </div>

      <span className="text-4xl font-bold tracking-tight">
        {totalUsers.toLocaleString()}
      </span>

      <span className={`text-sm ${growthPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
        {growthPercent >= 0 ? "▲" : "▼"} {Math.abs(growthPercent)}% vs last month
      </span>
    </div>
  );
}
