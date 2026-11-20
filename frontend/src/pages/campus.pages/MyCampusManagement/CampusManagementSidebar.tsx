import { LayoutDashboard, Building2, BookOpen, Users, Settings } from "lucide-react";

export type CampusManagementSection = "overview" | "details" | "courses" | "people" | "settings";

const items: { id: CampusManagementSection; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "details", label: "Campus details", icon: Building2 },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "people", label: "People", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function CampusManagementSidebar({ active, onChange }: { active: CampusManagementSection; onChange: (section: CampusManagementSection) => void }) {
  return <aside className="w-full shrink-0 border-b border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900 md:w-56 md:border-b-0 md:border-r md:p-4">
    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Campus workspace</p>
    <nav aria-label="Campus management" className="flex gap-1 overflow-x-auto md:flex-col">
      {items.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => onChange(id)} aria-current={active === id ? "page" : undefined} className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition md:w-full ${active === id ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"}`}><Icon size={18} />{label}</button>)}
    </nav>
  </aside>;
}
