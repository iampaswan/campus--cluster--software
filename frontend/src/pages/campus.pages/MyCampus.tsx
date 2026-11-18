
import { useCallback, useEffect, useState } from "react";
import type { Campus } from "../../types/campus";

import Button from "../../components/user-interface/Button";

import CampusFormModal from "./CampusFromModal";
import CampusCard from "./CampusCard";

import { deleteCampus, getMyCampuses } from "../../configuration/campusConfiguration";

export default function MyCampuses() {

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
    <div className="">
      {/* Page header */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate text-md  font-bold text-gray-900 dark:text-white ">
            My Campuses
          </h1>

        </div>

        {/* Create button at the top right */}
        <Button
          type="button"
          onClick={handleCreate}
          variant="primary"
          size="sm"

        >
          <span aria-hidden="true">+</span>
          Create Campus
        </Button>
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
          {/* <p className="mb-5 text-sm text-gray-500">
            {campuses.length}{" "}
            {campuses.length === 1 ? "campus" : "campuses"}
          </p> */}

          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {campuses.map((campus) => (
              <CampusCard key={campus.id} campus={campus} variant="owned" onEdit={handleEdit} onArchive={(item) => void handleArchive(item)} archiving={archivingId === campus.id} />
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
    </div>
  );
}
