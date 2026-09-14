
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  BookOpen,
  Loader2,
} from "lucide-react";



import { getMyCourses, type Course } from "../../configuration/courseConfiguration";

const Courses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyCourses();

      setCourses(response.data.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setError("Failed to load your courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">

        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold text-gray-900 sm:text-2xl">
            My Courses
          </h1>

          <p className="mt-1 hidden text-sm text-gray-500 sm:block">
            Manage the courses you have created
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/courses/create")}
          className="
            flex
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-black
            p-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-gray-800
            sm:px-4
            sm:py-2.5
          "
        >
          <Plus size={18} />

          <span className="hidden sm:inline">
            Create Course
          </span>
        </button>

      </div>


      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <Loader2
            size={28}
            className="animate-spin text-gray-500"
          />
        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="
          rounded-lg
          border
          border-red-200
          bg-red-50
          p-4
          text-sm
          text-red-600
        ">
          {error}

          <button
            onClick={fetchCourses}
            className="ml-3 font-medium underline"
          >
            Retry
          </button>
        </div>
      )}


      {/* Empty State */}
      {!loading &&
        !error &&
        courses.length === 0 && (
          <div className="
            flex
            flex-col
            items-center
            justify-center
            rounded-xl
            border
            border-dashed
            border-gray-300
            bg-white
            py-20
          ">

            <div className="
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-gray-100
            ">
              <BookOpen
                size={26}
                className="text-gray-500"
              />
            </div>

            <h2 className="text-lg font-medium text-gray-900">
              No courses yet
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Create your first course to get started.
            </p>

            <button
              onClick={() =>
                navigate("/courses/create")
              }
              className="
                mt-5
                rounded-lg
                bg-black
                px-4
                py-2
                text-sm
                font-medium
                text-white
                hover:bg-gray-800
              "
            >
              Create Course
            </button>

          </div>
        )}


      {/* Course Grid */}
      {!loading &&
        !error &&
        courses.length > 0 && (
          <div className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          ">

            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() =>
                  navigate(`/courses/${course.id}`)
                }
                className="
                  cursor-pointer
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:shadow-md
                "
              >

                {/* Thumbnail */}
                <div className="h-40 bg-gray-100">

                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <div className="
                      flex
                      h-full
                      items-center
                      justify-center
                    ">
                      <BookOpen
                        size={36}
                        className="text-gray-400"
                      />
                    </div>
                  )}

                </div>


                {/* Content */}
                <div className="p-4">

                  <div className="
                    mb-2
                    flex
                    items-start
                    justify-between
                    gap-2
                  ">

                    <h2 className="
                      line-clamp-2
                      text-base
                      font-semibold
                      text-gray-900
                    ">
                      {course.title}
                    </h2>

                    <span className="
                      shrink-0
                      rounded-full
                      bg-gray-100
                      px-2
                      py-1
                      text-xs
                      capitalize
                      text-gray-600
                    ">
                      {course.level}
                    </span>

                  </div>


                  {course.description && (
                    <p className="
                      mb-4
                      line-clamp-2
                      text-sm
                      text-gray-500
                    ">
                      {course.description}
                    </p>
                  )}


                  {/* Footer */}
                  <div className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-gray-100
                    pt-3
                  ">

                    <span className="
                      rounded-full
                      bg-gray-100
                      px-2.5
                      py-1
                      text-xs
                      capitalize
                      text-gray-600
                    ">
                      {course.status}
                    </span>

                    <span className="
                      text-sm
                      font-medium
                      text-gray-900
                    ">
                      {course.isPaid
                        ? `₹${course.price}`
                        : "Free"}
                    </span>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

    </div>
  );
};

export default Courses;

