import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Button from "../../components/user-interface/Button";

import {
  createCourse,
  type CreateCourseData,
} from "../../configuration/courseConfiguration";





const CreateCourse = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<CreateCourseData>({
    title: "",
    slug: "",
    description: "",

    thumbnail: "",
    banner: "",

    campusId: null,

    visibility: "public",
    status: "draft",

    categoryId: null,

    level: "beginner",
    language: "English",

    price: 0,
    isPaid: false,
    certificate: false,
  });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data: CreateCourseData = {
        ...form,
        price: Number(form.price),
      };

      await createCourse(data);

      navigate("/courses");

    } catch (error: any) {
      console.error(
        "Failed to create course:",
        error
      );

      setError(
        error?.response?.data?.message ||
        "Failed to create course."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-4">



      {/* Header */}
      <div className=" flex items-center justify-between gap-3 ">


        <h1 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Create Course
        </h1>


        <Button
          onClick={() => navigate(-1)}
          size="sm"
          variant="secondary"

        >
          <ArrowLeft size={15} />Go Back
        </Button>



      </div>


      {/* Error */}
      {error && (
        <div className="
            mb-5
            rounded-lg
            border
            border-red-200
            bg-red-50
            p-3
            text-sm
            text-red-600
          ">
          {error}
        </div>
      )}


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
            space-y-6
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            sm:p-6
          "
      >

        {/* Basic Information */}
        <div>
          <h2 className="mb-4 text-base font-semibold text-gray-900">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Title */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Course Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Introduction to Python"
                required
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    focus:border-black
                  "
              />
            </div>


            {/* Slug */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="introduction-to-python"
                required
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    focus:border-black
                  "
              />
            </div>


            {/* Language */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Language
              </label>

              <input
                type="text"
                name="language"
                value={form.language}
                onChange={handleChange}
                placeholder="English"
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    focus:border-black
                  "
              />
            </div>


            {/* Description */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe what students will learn..."
                className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    focus:border-black
                  "
              />
            </div>

          </div>
        </div>


        {/* Media */}
        <div>
          <h2 className="mb-4 text-base font-semibold text-gray-900">
            Course Media
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Thumbnail URL
              </label>

              <input
                type="url"
                name="thumbnail"
                value={form.thumbnail}
                onChange={handleChange}
                placeholder="https://..."
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    focus:border-black
                  "
              />
            </div>


            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Banner URL
              </label>

              <input
                type="url"
                name="banner"
                value={form.banner}
                onChange={handleChange}
                placeholder="https://..."
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    focus:border-black
                  "
              />
            </div>

          </div>
        </div>


        {/* Course Settings */}
        <div>
          <h2 className="mb-4 text-base font-semibold text-gray-900">
            Course Settings
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Visibility */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Visibility
              </label>

              <select
                name="visibility"
                value={form.visibility}
                onChange={handleChange}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                  "
              >
                <option value="public">
                  Public
                </option>

                <option value="private">
                  Private
                </option>
              </select>
            </div>


            {/* Status */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                  "
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>
              </select>
            </div>


            {/* Level */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Level
              </label>

              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                  "
              >
                <option value="beginner">
                  Beginner
                </option>

                <option value="intermediate">
                  Intermediate
                </option>

                <option value="advanced">
                  Advanced
                </option>
              </select>
            </div>


            {/* Price */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                min="0"
                value={form.price}
                onChange={handleChange}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-3
                    py-2.5
                    text-sm
                    outline-none
                    focus:border-black
                  "
              />
            </div>

          </div>
        </div>


        {/* Checkboxes */}
        <div className="space-y-3">

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.isPaid}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  isPaid: e.target.checked,
                }))
              }
              className="h-4 w-4"
            />

            <span className="text-sm text-gray-700">
              This is a paid course
            </span>
          </label>


          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.certificate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  certificate: e.target.checked,
                }))
              }
              className="h-4 w-4"
            />

            <span className="text-sm text-gray-700">
              Provide certificate after completion
            </span>
          </label>

        </div>


        {/* Actions */}
        <div className="
            flex
            flex-col-reverse
            gap-3
            border-t
            border-gray-100
            pt-5
            sm:flex-row
            sm:justify-end
          ">

          <Button
            onClick={() => navigate("/courses")}
            size="sm"
            variant="secondary"
          >
            Cancel
          </Button>






          <Button
            disabled={loading}
            size="sm"
            variant="primary"

          >
            {loading && (
              <Loader2
                size={17}
                className="animate-spin"
              />
            )}

            {loading
              ? "Creating..."
              : "Create Course"}
          </Button>

        </div>

      </form>

    </div>

  );
};

export default CreateCourse;
