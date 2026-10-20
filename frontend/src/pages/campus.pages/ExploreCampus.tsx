
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCampuses } from "../../configuration/campusConfiguration";
import type { Campus } from "../../types/campus";

export default function ExploreCampuses() {
  const navigate = useNavigate();

  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [myCampusIds, setMyCampusIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
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
          getCampuses().catch(() => null),
        ]);

        if (!active) return;

        const publicData = publicResponse.data.data;
        const ownedCampuses = myResponse?.data.data.data ?? [];

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

    return campuses.filter((campus) => {
      // Hide campuses created by the current user.
      if (myCampusIds.has(campus.id)) return false;

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
  }, [campuses, myCampusIds, search]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Explore Campuses
          </h1>
          <p className="mt-2 text-gray-600">
            Discover schools, colleges, universities, and learning communities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/campuses/my")}
          className="rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
        >
          My Campuses
        </button>
      </div>

      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by campus name, city, or type..."
          aria-label="Search campuses"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCampuses.map((campus) => (
            <article
              key={campus.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {campus.bannerUrl ? (
                <img
                  src={campus.bannerUrl}
                  alt={`${campus.name} banner`}
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="flex h-36 items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
                  <span className="text-4xl font-bold text-blue-700">
                    {campus.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="p-5">
                <div className="mb-3 flex items-start gap-3">
                  {campus.logoUrl ? (
                    <img
                      src={campus.logoUrl}
                      alt={`${campus.name} logo`}
                      className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg font-bold text-gray-600">
                      {campus.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-semibold text-gray-900">
                      {campus.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {campus.type.replaceAll("_", " ")}
                    </p>
                  </div>
                </div>

                <p className="mb-4 line-clamp-3 min-h-[4.5rem] text-sm text-gray-600">
                  {campus.description || "No description available yet."}
                </p>

                {(campus.city || campus.state || campus.country) && (
                  <p className="mb-4 text-sm text-gray-500">
                    <span aria-hidden="true">📍 </span>
                    {[campus.city, campus.state, campus.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => navigate(`/campuses/${campus.slug}`)}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                  View Campus
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
