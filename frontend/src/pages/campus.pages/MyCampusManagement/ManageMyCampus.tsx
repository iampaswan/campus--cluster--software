import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CalendarDays, MapPin, Pencil, Users } from "lucide-react";
import { getMyCampuses } from "../../../configuration/campusConfiguration";
import type { Campus } from "../../../types/campus";
import Button from "../../../components/user-interface/Button";
import CampusFormModal from "../CampusFromModal";
import CampusInfoCard from "./CampusInfoCard";
import CampusManagementSidebar, { type CampusManagementSection } from "./CampusManagementSidebar";

export default function ManageMyCampus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const campusId = searchParams.get("campusId");
  const [campus, setCampus] = useState<Campus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [section, setSection] = useState<CampusManagementSection>("overview");
  const [editOpen, setEditOpen] = useState(false);

  const loadCampus = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getMyCampuses();
      const found = (response.data.data ?? []).find((item) => item.id === campusId);
      if (!found) {
        setCampus(null);
        setError("We couldn't find that campus in your account.");
      } else setCampus(found);
    } catch (err) {
      console.error("Failed to load campus:", err);
      setError("Unable to load campus details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [campusId]);

  useEffect(() => { void loadCampus(); }, [loadCampus]);

  if (loading) return <div className="py-20 text-center text-gray-500">Loading campus workspace...</div>;
  if (!campus || error) return <div className="mx-auto max-w-xl py-20 text-center"><h1 className="text-xl font-semibold text-gray-900 dark:text-white">Campus unavailable</h1><p className="mt-2 text-gray-600 dark:text-gray-400">{error || "Choose a campus from My Campuses to open its workspace."}</p><div className="mt-5 flex justify-center gap-3"><Button variant="secondary" onClick={() => navigate("/my-campus")}>Back to My Campuses</Button><Button onClick={() => void loadCampus()}>Try again</Button></div></div>;

  const location = [campus.city, campus.state, campus.country].filter(Boolean).join(", ");
  const createdDate = new Date(campus.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

  return <div className="  -mx-4 -my-2 min-h-full bg-gray-50 dark:bg-black">
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="relative h-32 bg-gradient-to-r from-blue-100 via-indigo-100 to-violet-100 dark:from-blue-950 dark:via-indigo-950 dark:to-violet-950">
        {campus.bannerUrl && <img src={campus.bannerUrl} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="mx-auto flex max-w-7xl flex-row flex-wrap items-center justify-between gap-3 px-4 pb-3">
        <div className="-mt-9 flex min-w-0 items-end gap-3">
          {campus.logoUrl ? <img src={campus.logoUrl} alt={`${campus.name} logo`} className="h-16 w-16 rounded-xl border-4 border-white bg-white object-cover shadow-sm dark:border-gray-950" /> : <div className="flex h-16 w-16 items-center justify-center rounded-xl border-4 border-white bg-blue-600 text-2xl font-bold text-white shadow-sm dark:border-gray-950">{campus.name.charAt(0).toUpperCase()}</div>}
          <div className="min-w-0 pb-1"><h1 className="truncate text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{campus.name}</h1><div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400"><span>{campus.type.replaceAll("_", " ")}</span>{location && <span className="inline-flex items-center gap-1"><MapPin size={14} />{location}</span>}</div></div>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2"><Button variant="secondary" size="sm" onClick={() => navigate("/my-campus")}><ArrowLeft size={16} />My campuses</Button><Button size="sm" onClick={() => setEditOpen(true)}><Pencil size={15} />Edit campus</Button></div>
      </div>
    </header>

    <div className="mx-auto flex max-w-7xl flex-col md:min-h-[calc(100vh-16rem)] md:flex-row">
      <CampusManagementSidebar active={section} onChange={setSection} />
      <main className="min-w-0 flex-1 p-4 sm:p-6">
        {section === "overview" && <>
          <div className="mb-6"><h2 className="text-xl font-bold text-gray-900 dark:text-white">Campus dashboard</h2><p className="mt-1 text-sm text-gray-500 dark:text-gray-400">An overview of {campus.name} and its profile.</p></div>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <CampusInfoCard label="Campus type" value={campus.type.replaceAll("_", " ")} icon={<BookOpen size={16} />} />
            <CampusInfoCard label="Visibility" value={campus.visibility.replaceAll("_", " ")} icon={<Users size={16} />} />
            <CampusInfoCard label="Created" value={createdDate} icon={<CalendarDays size={16} />} />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><h3 className="font-semibold text-gray-900 dark:text-white">About this campus</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600 dark:text-gray-300">{campus.description || "Add a description to tell learners about your campus."}</p></section>
            <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"><h3 className="font-semibold text-gray-900 dark:text-white">Campus profile</h3><dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2"><div><dt className="text-gray-500">Status</dt><dd className="mt-1 font-medium text-gray-900 dark:text-white">{campus.status.replaceAll("_", " ")}</dd></div><div><dt className="text-gray-500">Verification</dt><dd className="mt-1 font-medium text-gray-900 dark:text-white">{campus.isVerified ? "Verified" : "Not verified"}</dd></div><div><dt className="text-gray-500">Website</dt><dd className="mt-1 break-all font-medium text-blue-600">{campus.website ? <a href={campus.website} target="_blank" rel="noreferrer">{campus.website}</a> : "Not provided"}</dd></div><div><dt className="text-gray-500">Contact email</dt><dd className="mt-1 break-all font-medium text-gray-900 dark:text-white">{campus.email || "Not provided"}</dd></div></dl></section>
          </div>
        </>}
        {section === "details" && <><div className="mb-6"><h2 className="text-xl font-bold text-gray-900 dark:text-white">Campus details</h2><p className="mt-1 text-sm text-gray-500">Review the information shown on your campus profile.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"><CampusInfoCard label="Campus name" value={campus.name} /><CampusInfoCard label="Campus type" value={campus.type.replaceAll("_", " ")} /><CampusInfoCard label="Visibility" value={campus.visibility.replaceAll("_", " ")} /><CampusInfoCard label="Country" value={campus.country} /><CampusInfoCard label="State / region" value={campus.state} /><CampusInfoCard label="City" value={campus.city} /><CampusInfoCard label="Address" value={campus.address} /><CampusInfoCard label="Website" value={campus.website && <a href={campus.website} target="_blank" rel="noreferrer" className="text-blue-600">{campus.website}</a>} /><CampusInfoCard label="Email" value={campus.email} /><CampusInfoCard label="Phone" value={campus.phone} /></div><Button className="mt-5" onClick={() => setEditOpen(true)}><Pencil size={15} />Edit details</Button></>}
        {section === "courses" && <SectionPlaceholder title="Courses" description="Courses connected to this campus will appear here when they are available." />}
        {section === "people" && <SectionPlaceholder title="People" description="Manage instructors, staff, and learners associated with this campus." />}
        {section === "settings" && <><SectionPlaceholder title="Campus settings" description="Update campus profile details and visibility from this workspace." /><Button className="mt-4" onClick={() => setEditOpen(true)}><Pencil size={15} />Edit campus profile</Button></>}
      </main>
    </div>
    <CampusFormModal open={editOpen} campus={campus} onClose={() => setEditOpen(false)} onSaved={async () => { setEditOpen(false); await loadCampus(); }} />
  </div>;
}

function SectionPlaceholder({ title, description }: { title: string; description: string }) {
  return <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center dark:border-gray-700 dark:bg-gray-900"><h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2><p className="mx-auto mt-2 max-w-lg text-sm text-gray-500 dark:text-gray-400">{description}</p></div>;
}
