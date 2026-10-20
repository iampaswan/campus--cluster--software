
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Campus } from "../../types/campus";

import CampusFormModal from "./CampusFromModal";

import { deleteCampus, getMyCampuses } from "../../configuration/campusConfiguration";

export default function MyCampuses() {
  const navigate = useNavigate();

  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [archivingId, setArchivingId] = useState<string | null>(null);

  const loadMyCampuses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyCampuses();
      setCampuses(response.data.data ?? []);
    } catch (err) {
      console.error("Failed to load my campuses:", err);
      setError("Unable to load your campuses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMyCampuses();
  }, [loadMyCampuses]);

  const handleCreate = () => {
    setSelectedCampus(null);
    setActionError("");
    setModalOpen(true);
  };

  const handleEdit = (campus: Campus) => {
    setSelectedCampus(campus);
    setActionError("");
    setModalOpen(true);
  };

  const handleSaved = async () => {
    setModalOpen(false);
    setSelectedCampus(null);
    await loadMyCampuses();
  };

  const handleArchive = async (campus: Campus) => {
    const confirmed = window.confirm(
      `Are you sure you want to archive "${campus.name}"?`
    );

    if (!confirmed) return;

    setActionError("");
    setArchivingId(campus.id);

    try {
      await deleteCampus(campus.id);
      setCampuses((current) =>
        current.filter((item) => item.id !== campus.id)
      );
    } catch (err) {
      console.error("Failed to archive campus:", err);
      setActionError(
        `Unable to archive "${campus.name}". Please try again.`
      );
    } finally {
      setArchivingId(null);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Campuses
          </h1>
          <p className="mt-2 text-gray-600">
            Manage the campuses you have created.
          </p>
        </div>

        {/* Create button at the top right */}
        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <span aria-hidden="true">+</span>
          Create Campus
        </button>
      </div>

      {/* Error messages */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void loadMyCampuses()}
            className="mt-2 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      {actionError && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {actionError}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="py-16 text-center text-gray-500">
          Loading your campuses...
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && campuses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center">
          <div className="mb-4 text-5xl" aria-hidden="true">
            🏫
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            You haven't created a campus yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-gray-600">
            Create a campus to organize courses, learning materials,
            instructors, and students in one place.
          </p>

          <button
            type="button"
            onClick={handleCreate}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create Your First Campus
          </button>
        </div>
      )}

      {/* Campus cards */}
      {!loading && campuses.length > 0 && (
        <>
          <p className="mb-5 text-sm text-gray-500">
            {campuses.length}{" "}
            {campuses.length === 1 ? "campus" : "campuses"}
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {campuses.map((campus) => (
              <article
                key={campus.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
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
                    {campus.description || "No description available."}
                  </p>

                  {(campus.city || campus.state || campus.country) && (
                    <p className="mb-4 text-sm text-gray-500">
                      <span aria-hidden="true">📍 </span>
                      {[campus.city, campus.state, campus.country]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}

                  <div className="mb-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${campus.visibility === "PUBLIC"
                        ? "bg-green-100 text-green-700"
                        : campus.visibility === "PRIVATE"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-purple-100 text-purple-700"
                        }`}
                    >
                      {campus.visibility.replaceAll("_", " ")}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/campuses/${campus.slug}`)
                      }
                      className="rounded-lg border border-gray-300 px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEdit(campus)}
                      className="rounded-lg bg-blue-50 px-2 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={archivingId === campus.id}
                      onClick={() => void handleArchive(campus)}
                      className="rounded-lg bg-red-50 px-2 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {archivingId === campus.id ? "Archiving..." : "Archive"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/* Shared create/edit modal */}
      <CampusFormModal
        open={modalOpen}
        campus={selectedCampus}
        onClose={() => {
          setModalOpen(false);
          setSelectedCampus(null);
        }}
        onSaved={handleSaved}
      />
    </section>
  );
}
