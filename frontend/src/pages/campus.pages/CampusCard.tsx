import { useNavigate } from "react-router-dom";
import type { Campus } from "../../types/campus";
import Button from "../../components/user-interface/Button";

interface CampusCardProps {
  campus: Campus;
  variant?: "explore" | "owned";
  onEdit?: (campus: Campus) => void;
  onArchive?: (campus: Campus) => void;
  archiving?: boolean;
}

export default function CampusCard({ campus, variant = "explore", onEdit, onArchive, archiving = false }: CampusCardProps) {
  const navigate = useNavigate();
  const owned = variant === "owned";
  const initial = campus.name.charAt(0).toUpperCase();
  return (
    <article className={`overflow-hidden border border-gray-200 bg-white shadow-sm transition ${owned ? "rounded-lg hover:shadow-md" : "rounded-2xl hover:-translate-y-1 hover:shadow-md"}`}>
      {campus.bannerUrl ? <img src={campus.bannerUrl} alt={`${campus.name} banner`} className={`w-full object-cover ${owned ? "h-16" : "h-36"}`} /> : <div className={`flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 ${owned ? "h-16" : "h-36"}`}><span className={`font-bold text-blue-700 ${owned ? "text-2xl" : "text-4xl"}`}>{initial}</span></div>}
      <div className={owned ? "p-3" : "p-5"}>
        <div className={`flex ${owned ? "mb-2 items-center gap-2" : "mb-3 items-start gap-3"}`}>
          {campus.logoUrl ? <img src={campus.logoUrl} alt={`${campus.name} logo`} className={`rounded-md border border-gray-200 object-cover ${owned ? "h-8 w-8" : "h-12 w-12 rounded-lg"}`} /> : <div className={`flex shrink-0 items-center justify-center bg-gray-100 font-bold text-gray-600 ${owned ? "h-8 w-8 rounded-md text-sm" : "h-12 w-12 rounded-lg text-lg"}`}>{initial}</div>}
          <div className="min-w-0 flex-1"><h2 className={`truncate font-semibold text-gray-900 ${owned ? "text-sm" : "text-lg"}`}>{campus.name}</h2><p className={`text-gray-500 ${owned ? "truncate text-xs" : "text-sm"}`}>{campus.type.replaceAll("_", " ")}</p></div>
        </div>
        <p className={`text-gray-600 ${owned ? "mb-2 line-clamp-1 text-xs" : "mb-4 line-clamp-3 min-h-[4.5rem] text-sm"}`}>{campus.description || (owned ? "No description available." : "No description available yet.")}</p>
        {(campus.city || campus.state || campus.country) && <p className={`text-gray-500 ${owned ? "mb-2 truncate text-xs" : "mb-4 text-sm"}`}><span aria-hidden="true">📍 </span>{[campus.city, campus.state, campus.country].filter(Boolean).join(", ")}</p>}
        {owned ? <><div className="mb-3"><span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${campus.visibility === "PUBLIC" ? "bg-green-100 text-green-700" : campus.visibility === "PRIVATE" ? "bg-amber-100 text-amber-700" : "bg-purple-100 text-purple-700"}`}>{campus.visibility.replaceAll("_", " ")}</span></div><div className="grid grid-cols-3 gap-1"><Button type="button" onClick={() => navigate(`/campus-management?campusId=${encodeURIComponent(campus.id)}`)} variant="secondary" size="sm">Manage</Button><Button type="button" onClick={() => onEdit?.(campus)} variant="secondary" size="sm">Edit</Button><Button type="button" disabled={archiving} onClick={() => onArchive?.(campus)} variant="danger" size="sm">{archiving ? "Archiving..." : "Archive"}</Button></div></> : <button type="button" onClick={() => navigate(`/campuses/${campus.slug}`)} className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700">View Campus</button>}
      </div>
    </article>
  );
}
