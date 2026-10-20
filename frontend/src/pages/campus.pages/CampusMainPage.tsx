
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Plus,
  GraduationCap,
  MapPin,
  Users,
  Loader2,
  X,
} from "lucide-react";

import {
  createCampus,
  getCampuses,
} from "../../configuration/campusConfiguration";

import type {
  Campus,
  CampusType,
  CampusVisibility,
} from "../../types/campus";

const campusTypes: CampusType[] = [
  "SCHOOL",
  "COLLEGE",
  "UNIVERSITY",
  "INSTITUTE",
  "BOOTCAMP",
  "COMPANY",
  "TRAINING_CENTER",
  "COMMUNITY",
  "ONLINE_ACADEMY",
  "OTHER",
];

const initialForm = {
  name: "",
  description: "",
  type: "COLLEGE" as CampusType,
  visibility: "PUBLIC" as CampusVisibility,
  country: "",
  state: "",
  city: "",
  website: "",
};

export default function CampusExplorer() {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadCampuses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCampuses({
        page: 1,
        limit: 50,
        search: search.trim() || undefined,
      });

      setCampuses(response.data.data.data);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Unable to load campuses."
      );
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    void loadCampuses();
  }, [loadCampuses]);

  const handleCreateCampus = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      const response = await createCampus(form);
      const campus = response.data.data;

      setCampuses((current) => [
        campus,
        ...current.filter(
          (item) => item.id !== campus.id
        ),
      ]);

      setForm(initialForm);
      setShowCreate(false);
      setSuccess("Campus created successfully.");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Unable to create campus."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-600">
              CAMPUSCLUSTER COMMUNITY
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Explore Campuses
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Discover learning communities and find your next campus.
            </p>
          </div>

          <button
            onClick={() => {
              setError("");
              setSuccess("");
              setShowCreate(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Create Campus
          </button>
        </div>

        {success && (
          <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
            <button
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="mb-6 flex max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search campuses, cities, states..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={28} />
          </div>
        ) : campuses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <GraduationCap
              size={36}
              className="mx-auto mb-3 text-slate-300"
            />

            <h2 className="font-semibold text-slate-800">
              No campuses found
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Try another search or create a new campus.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {campuses.map((campus) => (
              <article
                key={campus.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-28 items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100">
                  {campus.logoUrl ? (
                    <img
                      src={campus.logoUrl}
                      alt={`${campus.name} logo`}
                      className="h-16 w-16 rounded-xl bg-white object-cover"
                    />
                  ) : (
                    <GraduationCap
                      size={38}
                      className="text-blue-600"
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-slate-900">
                      {campus.name}
                    </h2>

                    {campus.isVerified && (
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="mb-4 line-clamp-2 min-h-10 text-sm text-slate-500">
                    {campus.description ||
                      "Discover courses, learning materials, and educational opportunities."}
                  </p>

                  <div className="mb-4 space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} />
                      {campus.type.replaceAll("_", " ")}
                    </div>

                    {(campus.city || campus.state || campus.country) && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        {[campus.city, campus.state, campus.country]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      {campus.visibility === "PUBLIC"
                        ? "Public campus"
                        : "Restricted campus"}
                    </div>
                  </div>

                  <a
                    href={`/campuses/${campus.slug}`}
                    className="block w-full rounded-lg border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    View Campus
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
            <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Create a Campus
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Start your own learning community.
                  </p>
                </div>

                <button
                  onClick={() => setShowCreate(false)}
                  aria-label="Close dialog"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={handleCreateCampus}
                className="space-y-4"
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Campus Name *
                  </label>

                  <input
                    required
                    minLength={2}
                    maxLength={150}
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="e.g. Jaipur Engineering College"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    rows={3}
                    maxLength={2000}
                    value={form.description}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        description: event.target.value,
                      })
                    }
                    placeholder="Tell learners about your campus..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Campus Type *
                    </label>

                    <select
                      value={form.type}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          type: event.target.value as CampusType,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                    >
                      {campusTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.replaceAll("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Visibility *
                    </label>

                    <select
                      value={form.visibility}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          visibility: event.target.value as CampusVisibility,
                        })
                      }
                      className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                    >
                      <option value="PUBLIC">Public</option>
                      <option value="PRIVATE">Private</option>
                      <option value="INVITE_ONLY">Invite Only</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {(["city", "state", "country"] as const).map((field) => (
                    <div key={field}>
                      <label className="mb-1.5 block text-sm font-medium capitalize">
                        {field}
                      </label>

                      <input
                        value={form[field]}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            [field]: event.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                        placeholder={field}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Website
                  </label>

                  <input
                    type="url"
                    value={form.website}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        website: event.target.value,
                      })
                    }
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={creating}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {creating && (
                      <Loader2 size={15} className="animate-spin" />
                    )}
                    {creating ? "Creating..." : "Create Campus"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
