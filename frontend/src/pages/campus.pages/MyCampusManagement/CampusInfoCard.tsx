import type { ReactNode } from "react";

export default function CampusInfoCard({ label, value, icon }: { label: string; value: ReactNode; icon?: ReactNode }) {
  return <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">{icon}<span>{label}</span></div>
    <div className="mt-2 break-words text-base font-semibold text-gray-900 dark:text-white">{value || <span className="font-normal text-gray-400">Not provided</span>}</div>
  </div>;
}
