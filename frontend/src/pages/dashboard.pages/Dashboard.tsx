// pages/Dashboard.tsx

"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CalendarDays,
  ChevronRight,
  Clock3,
  Flame,
  GraduationCap,

  MessageSquare,
  PlayCircle,

  Search,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Video,
} from "lucide-react";

const stats = [
  {
    label: "Courses Learning",
    value: "6",
    change: "+2 this month",
    icon: BookOpen,
  },
  {
    label: "Learning Hours",
    value: "24.5h",
    change: "+18% this week",
    icon: Clock3,
  },
  {
    label: "Course Progress",
    value: "68%",
    change: "+8% this week",
    icon: TrendingUp,
  },
  {
    label: "Learning Streak",
    value: "12 days",
    change: "Keep it going!",
    icon: Flame,
  },
];

const courses = [
  {
    title: "Full Stack Web Development",
    instructor: "Rahul Sharma",
    progress: 78,
    lessons: "18 / 24 lessons",
    category: "Development",
    icon: "FS",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    instructor: "Dr. Priya Mehta",
    progress: 52,
    lessons: "13 / 25 lessons",
    category: "AI & ML",
    icon: "AI",
  },
  {
    title: "Database Management System",
    instructor: "Amit Verma",
    progress: 35,
    lessons: "7 / 20 lessons",
    category: "Computer Science",
    icon: "DB",
  },
];

const campuses = [
  {
    name: "Jaipur Engineering Community",
    members: "2.4K members",
    courses: "34 courses",
    type: "College Community",
    status: "Joined",
  },
  {
    name: "AI & Machine Learning Academy",
    members: "8.2K members",
    courses: "52 courses",
    type: "Learning Community",
    status: "Joined",
  },
  {
    name: "CampusCluster Developers",
    members: "1.8K members",
    courses: "21 courses",
    type: "Developer Community",
    status: "Explore",
  },
];

const upcoming = [
  {
    title: "React Advanced Patterns",
    type: "Live Class",
    time: "Today · 7:00 PM",
    icon: Video,
  },
  {
    title: "Database Design Assignment",
    type: "Assignment",
    time: "Tomorrow · 11:59 PM",
    icon: BookOpen,
  },
  {
    title: "Weekly Coding Contest",
    type: "Contest",
    time: "Sep 15 · 8:00 PM",
    icon: Trophy,
  },
];

const recommended = [
  {
    title: "System Design Fundamentals",
    description:
      "Learn scalable architecture, databases, caching and distributed systems.",
    students: "3.2K learners",
    level: "Intermediate",
  },
  {
    title: "Generative AI with LLMs",
    description:
      "Understand LLMs, RAG, embeddings and build AI-powered applications.",
    students: "5.8K learners",
    level: "Intermediate",
  },
  {
    title: "Generative AI with LLMs",
    description:
      "Understand LLMs, RAG, embeddings and build AI-powered applications.",
    students: "5.8K learners",
    level: "Intermediate",
  },
  {
    title: "System Design Fundamentals",
    description:
      "Learn scalable architecture, databases, caching and distributed systems.",
    students: "3.2K learners",
    level: "Intermediate",
  },
  {
    title: "Generative AI with LLMs",
    description:
      "Understand LLMs, RAG, embeddings and build AI-powered applications.",
    students: "5.8K learners",
    level: "Intermediate",
  },
  {
    title: "System Design Fundamentals",
    description:
      "Learn scalable architecture, databases, caching and distributed systems.",
    students: "3.2K learners",
    level: "Intermediate",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen text-slate-800">

      {/* Header */}
      <header className=" border-slate-200 bg-white/90 backdrop-blur-md mb-4">
        <div className="flex h-16 items-center justify-between ">

          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Hii, Krishna Kumar Paswan
            </h1>
            <p className="text-xs text-slate-400">
              Welcome back, Continue your learning journey.
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Search */}
            <button className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-400 hover:border-blue-200 hover:bg-white">
              <Search size={14} />
              Search courses, campuses...

            </button>

            {/* AI */}
            <button className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-100">
              <Sparkles size={14} />
              AI Assistant
            </button>



          </div>
        </div>
      </header>

      <main className="mx-auto max-w-375 ">

        {/* Welcome Banner */}
        <section className="relative mb-6 overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-lg shadow-blue-500/10">

          <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-purple-300/10 blur-3xl" />

          <div className="relative z-10 max-w-2xl">

            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-blue-100">
              <Sparkles size={14} />
              AI-powered learning
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
              Keep building your knowledge.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100">
              You are 68% through your current learning goals. Continue where
              you left off or discover something new today.
            </p>

            <div className="mt-5 flex gap-3">
              <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-50">
                <PlayCircle size={15} />
                Continue Learning
              </button>

              <button className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/20">
                Explore Courses
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      {stat.label}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </h3>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon size={17} />
                  </div>
                </div>

                <p className="mt-3 text-[11px] font-medium text-emerald-600">
                  {stat.change}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">

          {/* Left */}
          <div className="space-y-6">

            {/* Continue Learning */}
            <section>

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Continue Learning
                  </h2>
                  {/* <p className="mt-0.5 text-xs text-slate-400">
                    Pick up where you left off.
                  </p> */}
                </div>

                <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                  View all
                  <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                {courses.map((course) => (
                  <div
                    key={course.title}
                    className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                  >

                    <div className="mb-4 flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                        {course.icon}
                      </div>

                      <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">
                        {course.category}
                      </span>

                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                      {course.title}
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-400">
                      By {course.instructor}
                    </p>

                    <div className="mt-5">

                      <div className="mb-1.5 flex justify-between">
                        <span className="text-[10px] text-slate-400">
                          {course.lessons}
                        </span>

                        <span className="text-[10px] font-semibold text-blue-600">
                          {course.progress}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${course.progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 py-2 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600">
                      Continue
                      <ArrowRight size={13} />
                    </button>

                  </div>
                ))}

              </div>
            </section>

            {/* My Campuses */}
            <section>

              <div className="mb-4 flex items-center justify-between">

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    My Campuses
                  </h2>

                  {/* <p className="mt-0.5 text-xs text-slate-400">
                    Communities and institutions you belong to.
                  </p> */}
                </div>

                <button className="flex items-center gap-1 text-xs font-medium text-blue-600">
                  Explore
                  <ChevronRight size={14} />
                </button>

              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                {campuses.map((campus) => (
                  <div
                    key={campus.name}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <GraduationCap size={19} />
                      </div>

                      {campus.status === "Joined" ? (
                        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600">
                          Joined
                        </span>
                      ) : (
                        <button className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600">
                          Explore
                        </button>
                      )}

                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-900">
                      {campus.name}
                    </h3>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {campus.type}
                    </p>

                    <div className="mt-4 flex gap-3 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users size={11} />
                        {campus.members}
                      </span>

                      <span className="flex items-center gap-1">
                        <BookOpen size={11} />
                        {campus.courses}
                      </span>
                    </div>

                  </div>
                ))}

              </div>
            </section>

            {/* Recommended Courses */}
            <section>

              <div className="mb-4 flex items-center justify-between">

                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Recommended For You
                  </h2>

                  {/* <p className="mt-0.5 text-xs text-slate-400">
                    Courses selected based on your learning activity.
                  </p> */}
                </div>

                <button className="flex items-center gap-1 text-xs font-medium text-blue-600">
                  Browse courses
                  <ChevronRight size={14} />
                </button>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {recommended.map((course) => (
                  <div
                    key={course.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >

                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                        <BookOpen size={19} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <h3 className="text-sm font-semibold text-slate-900">
                          {course.title}
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {course.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between">

                          <div className="flex gap-3 text-[10px] text-slate-400">
                            <span>{course.students}</span>
                            <span>{course.level}</span>
                          </div>

                          <button className="flex items-center gap-1 text-xs font-medium text-blue-600">
                            View
                            <ArrowRight size={12} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </section>

          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">

            {/* AI Learning */}
            <section className="overflow-hidden rounded-xl border border-blue-100 bg-linear-to-br from-blue-50 to-indigo-50 p-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <Brain size={19} />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-slate-900">
                Your AI Learning Assistant
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Ask questions, summarize your course materials, generate
                quizzes, or get help understanding difficult topics.
              </p>

              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-700">
                <MessageSquare size={14} />
                Ask AI
              </button>

            </section>

            {/* Upcoming */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Upcoming
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Your next activities
                  </p>
                </div>

                <CalendarDays size={16} className="text-slate-400" />

              </div>

              <div className="space-y-4">

                {upcoming.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex gap-3"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                        <Icon size={14} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-800">
                          {item.title}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {item.type}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-blue-600">
                          {item.time}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

              <button className="mt-5 flex w-full items-center justify-center gap-1 border-t border-slate-100 pt-4 text-[11px] font-medium text-blue-600">
                View calendar
                <ChevronRight size={12} />
              </button>

            </section>

            {/* Learning Goal */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Weekly Goal
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Keep your learning consistent.
                  </p>
                </div>

                <Target size={17} className="text-blue-600" />

              </div>

              <div className="mt-5 flex items-center justify-center">

                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-8 border-blue-100">

                  <div className="absolute inset-2 rounded-full border-8 border-transparent border-t-blue-600 border-r-blue-600 rotate-[-20deg]" />

                  <div className="text-center">
                    <div className="text-xl font-bold text-slate-900">
                      7.5h
                    </div>

                    <div className="text-[9px] text-slate-400">
                      of 10h
                    </div>
                  </div>

                </div>

              </div>

              <p className="mt-4 text-center text-[10px] text-slate-400">
                2.5 hours remaining this week
              </p>

            </section>

            {/* Achievement */}
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Award size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Recent Achievement
                  </h2>

                  <p className="text-[10px] text-slate-400">
                    12-day learning streak
                  </p>
                </div>

              </div>

              <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2.5">
                <Flame size={15} className="text-amber-500" />
                <span className="text-[11px] font-medium text-amber-700">
                  You're on fire! Keep learning.
                </span>
              </div>

            </section>

          </aside>

        </div>

      </main>
    </div>
  );
}