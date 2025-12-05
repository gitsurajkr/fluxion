import { StickyNote } from "lucide-react";

export function AdminNotesCard({ notes }: { notes: string[] }) {
  return (
    <div className="rounded-xl border bg-card p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2">
        <StickyNote className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Welcome back, Admin 👋</h2>
      </div>

      <p className="text-sm text-muted-foreground">Here are your notes for today:</p>

      <ul className="space-y-1 text-sm">
        {notes.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-primary font-semibold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
