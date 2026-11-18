
import { useEffect, useMemo, useState } from "react";
import {
  getCampuses,
  getMyCampuses,
} from "../../configuration/campusConfiguration";
import type { Campus } from "../../types/campus";
import CampusCard from "./CampusCard";
import Button from "../../components/user-interface/Button";

export default function ExploreCampuses() {

  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [myCampusIds, setMyCampusIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<"name" | "recent">("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCampuses() {
      setLoading(true);
      setError("");

      try {
        // Load public campuses and the current user's campuses.
        const [publicResponse, myResponse] = await Promise.all([
          getCampuses({ page: 1, limit: 100 }),

          getMyCampuses().catch(() => null),
        ]);

        if (!active) return;

        const publicData = publicResponse.data.data;
        const ownedCampuses = myResponse?.data.data ?? [];

        setCampuses(publicData.data ?? []);
        setMyCampusIds(
          new Set<string>(ownedCampuses.map((campus: Campus) => campus.id)),
        );
      } catch (err) {
        console.error("Failed to load campuses:", err);
        if (active) {
          setError("Unable to load campuses. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCampuses();

    return () => {
      active = false;
    };
  }, []);

  const filteredCampuses = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = campuses.filter((campus) => {
      // Hide campuses created by the current user.
      if (myCampusIds.has(campus.id)) return false;
      if (typeFilter && campus.type !== typeFilter) return false;
      if (countryFilter && campus.country !== countryFilter) return false;
      if (verifiedOnly && !campus.isVerified) return false;

      if (!query) return true;

      return [
        campus.name,
        campus.description,
        campus.city,
        campus.state,
        campus.country,
        campus.type,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });

    return results.sort((a, b) => sortOrder === "name"
      ? a.name.localeCompare(b.name)
      : b.createdAt.localeCompare(a.createdAt));
  }, [campuses, myCampusIds, search, typeFilter, countryFilter, verifiedOnly, sortOrder]);

  const campusTypes = [...new Set(campuses.map((campus) => campus.type))].sort();
  const countries = [...new Set(campuses.map((campus) => campus.country).filter((country): country is string => Boolean(country)))].sort();
  const activeFilterCount = Number(Boolean(typeFilter)) + Number(Boolean(countryFilter)) + Number(verifiedOnly) + Number(sortOrder !== "name");

  return (
    <section className="">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="truncate text-md  font-bold text-gray-900 dark:text-white ">
            Explore Campuses
          </h1>
          <p className="mt-2 text-gray-600">
            Discover schools, colleges, universities, and learning communities.
          </p>
        </div>


        <div className="relative mb-6">
          <div className="flex gap-2">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search campuses..."
              aria-label="Search campuses"
              className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
            <Button size="sm" variant="secondary" type="button" aria-expanded={filterOpen} onClick={() => setFilterOpen((open) => !open)}>
              Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </Button>
          </div>

          {filterOpen && <div className="absolute right-0 z-10 mt-2 grid w-full gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:w-80 dark:border-gray-700 dark:bg-gray-900">
            <label className="grid gap-1 text-sm font-medium text-gray-700 dark:text-gray-200">Campus type
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option value="">All types</option>{campusTypes.map((type) => <option key={type} value={type}>{type.replaceAll("_", " ")}</option>)}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-medium text-gray-700 dark:text-gray-200">Country
              <select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option value="">All countries</option>{countries.map((country) => <option key={country} value={country}>{country}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200"><input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} /> Verified campuses only</label>
            <label className="grid gap-1 text-sm font-medium text-gray-700 dark:text-gray-200">Sort by
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as "name" | "recent")} className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option value="name">Name</option><option value="recent">Recently added</option>
              </select>
            </label>
            <button type="button" onClick={() => { setTypeFilter(""); setCountryFilter(""); setVerifiedOnly(false); setSortOrder("name"); }} className="justify-self-start text-sm font-medium text-blue-600 hover:underline">Clear filters</button>
          </div>}
        </div>

      </div>



      {loading && (
        <p className="py-12 text-center text-gray-500">
          Loading campuses...
        </p>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filteredCampuses.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 px-6 py-14 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            No campuses found
          </h2>
          <p className="mt-2 text-gray-500">
            Try a different search, or check back later for more campuses.
          </p>
        </div>
      )}

      {!loading && !error && filteredCampuses.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCampuses.map((campus) => <CampusCard key={campus.id} campus={campus} variant="owned" />)}
        </div>
      )}
    </section>
  );
}
