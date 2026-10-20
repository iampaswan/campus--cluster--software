
"use client";

import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

import {
  createCampus,
  updateCampus,
} from "../../configuration/campusConfiguration";

import type {
  Campus,
  CampusType,
  CampusVisibility,
  CreateCampusPayload,
} from "../../types/campus";

interface Props {
  campus?: Campus | null;
  onClose: () => void;
  onSaved: (campus: Campus) => void;
}

const emptyForm: CreateCampusPayload = {
  name: "",
  description: "",
  type: "COLLEGE",
  visibility: "PUBLIC",
  country: "",
  state: "",
  city: "",
  website: "",
};

export default function CampusFormModal({
  campus,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<CreateCampusPayload>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (campus) {
      setForm({
        name: campus.name,
        description: campus.description || "",
        type: campus.type,
        visibility: campus.visibility,
        country: campus.country || "",
        state: campus.state || "",
        city: campus.city || "",
        website: campus.website || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [campus]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = campus
        ? await updateCampus(campus.id, form)
        : await createCampus(form);

      onSaved(response.data.data);
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Failed to save campus."
      );
    } finally {
      setSaving(false);
    }
  };

  const updateField = (
    field: keyof CreateCampusPayload,
    value: string
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
      <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {campus ? "Edit Campus" : "Create Campus"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {campus
                ? "Update your campus details."
                : "Create a new learning community."}
            </p>
          </div>

          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Campus name *
            </label>
            <input
              required
              minLength={2}
              maxLength={150}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              rows={3}
              maxLength={2000}
              value={form.description || ""}
              onChange={(e) =>
                updateField("description", e.target.value)
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Type *
              </label>
              <select
                required
                value={form.type}
                onChange={(e) => updateField("type", e.target.value as CampusType)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              >
                {[
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
                ].map((type) => (
                  <option key={type} value={type}>
                    {type.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Visibility *
              </label>
              <select
                required
                value={form.visibility}
                onChange={(e) =>
                  updateField("visibility", e.target.value as CampusVisibility)
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
                <option value="INVITE_ONLY">Invite only</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {(["city", "state", "country"] as const).map((field) => (
              <div key={field}>
                <label className="mb-1 block text-sm font-medium capitalize">
                  {field}
                </label>
                <input
                  value={form[field] || ""}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Website
            </label>
            <input
              type="url"
              value={form.website || ""}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving && <Loader2 size={15} className="animate-spin" />}
              {saving
                ? "Saving..."
                : campus
                  ? "Save Changes"
                  : "Create Campus"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
