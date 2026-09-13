
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../../utils/theme-toggle";

import {
  Cpu, MessageSquare, FileText, BarChart3, Users, School,
  BookOpen, Search, Pen, SheetIcon,
  Mail, ChartAreaIcon, VideoIcon, ArrowRight, Star
} from "lucide-react";

const stats = [
  { num: "20", label: "Active learners" },
  { num: "125+", label: "AI-enhanced courses" },
  { num: "50%", label: "Satisfaction rate" },
  { num: "40+", label: "Campus" },
];

const features = [
  {
    title: "RAG-Enabled Document QA",
    description: "Upload course materials and get instant answers with citations directly from your slides and PDFs.",
    icon: <MessageSquare size={16} />,
    color: "blue",
  },
  {
    title: "AI Summarizer",
    description: "Automatically generate short, medium, or long summaries and key takeaways from any lesson.",
    icon: <FileText size={16} />,
    color: "purple",
  },
  {
    title: "Smart Quiz Generation",
    description: "Our AI automatically creates practice problems and flashcards based on your study content.",
    icon: <Cpu size={16} />,
    color: "green",
  },
  {
    title: "Predictive Analytics",
    description: "Track your progress with real-time metrics and AI-driven risk-of-failure insights.",
    icon: <BarChart3 size={16} />,
    color: "amber",
  },
  {
    title: "Role-Based Platform",
    description: "Designed for Students, Instructors, and Admins with secure RBAC and audit trails.",
    icon: <Users size={16} />,
    color: "red",
  },
  {
    title: "Create Campus",
    description: "Create a dedicated campus and invite instructors and students via unique invites or links.",
    icon: <School size={16} />,
    color: "indigo",
  },
  {
    title: "Explore Courses",
    description: "Browse a global catalog of AI-enhanced courses across various categories and prerequisites.",
    icon: <BookOpen size={16} />,
    color: "amber",
  },
  {
    title: "Community Discovery",
    description: "Find and connect with learners and top-rated instructors within your campus cluster.",
    icon: <Search size={16} />,
    color: "teal",
  },
  {
    title: "Join Contest",
    description: "Participate in contests and find your rank on the live leaderboard.",
    icon: <SheetIcon size={16} />,
    color: "yellow",
  },
  {
    title: "Problem of the Day",
    description: "Daily curated challenges to keep learners sharp and consistently engaged.",
    icon: <Pen size={16} />,
    color: "teal",
  },
  {
    title: "AI Agent Integration",
    description: "A multi-agent AI network helps students, instructors, and admins with complex tasks.",
    icon: <ChartAreaIcon size={16} />,
    color: "pink",
  },
  {
    title: "Content Generation",
    description: "Generate relevant contextual images and videos for easier understanding.",
    icon: <VideoIcon size={16} />,
    color: "blue",
  },
];

const iconBg: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  green: "bg-green-50 text-green-600 border-green-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  red: "bg-red-50 text-red-600 border-red-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  teal: "bg-teal-50 text-teal-600 border-teal-100",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
  pink: "bg-pink-50 text-pink-600 border-pink-100",
};

const steps = [
  { title: "Create your campus", desc: "Set up a dedicated space and invite instructors and students via unique links or invite codes." },
  { title: "Upload course materials", desc: "Add slides, PDFs, and videos. AI ingests and builds a knowledge context automatically." },
  { title: "Generate assessments", desc: "AI auto-creates quizzes, assignments, and flashcards from your uploaded content." },
  { title: "Students learn and assess", desc: "Learners access courses, attempt quizzes, and chat with the AI assistant for help." },
  { title: "Run live classes", desc: "Instructors host live sessions with smart AI-assisted attendance management built in." },
  { title: "Track and act on insights", desc: "Admins review predictive risk metrics and personalise learning paths for each student." },
];

const roles = [
  {
    initials: "AD",
    name: "Admin",
    sub: "Governs the campus",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    perms: ["Campus management", "Invite users", "Audit trails", "Risk reports", "Full analytics"],
  },
  {
    initials: "IN",
    name: "Instructor",
    sub: "Shapes the curriculum",
    bg: "bg-purple-50 text-purple-700 border-purple-100",
    perms: ["Create courses", "Upload materials", "Live classes", "Generate assessments", "Attendance"],
  },
  {
    initials: "ST",
    name: "Student",
    sub: "The learner at the centre",
    bg: "bg-blue-50 text-blue-700 border-blue-100",
    perms: ["Enrol in courses", "AI assistant", "Take quizzes", "Join contests", "View analytics"],
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/30 text-slate-800 font-sans antialiased selection:bg-blue-500 selection:text-white">

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-3 py-1 bg-white/10 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          Campus<span className="text-blue-600 font-bold">Cluster</span>
        </span>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          {["About", "Contact", "Login"].map((item) => (
            <button
              key={item}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate(`/${item.toLowerCase()}`)}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative flex flex-col items-center justify-center text-center px-6 py-16 lg:py-20 bg-linear-to-b from-blue-400/50 via-purple-500/20 to-transparent overflow-hidden">
        <div className="absolute top-12 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-4 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 max-w-2xl leading-tight">
          The next generation of <span className="text-gradient bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AI-powered</span> learning
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mb-8 leading-relaxed">
          Simplifying education with integrated multi-agent AI setups, localized RAG pipelines, automated assessments, and rich diagnostic analytics tailored beautifully for complete adaptive ecosystems.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xs sm:max-w-none">
          <button
            onClick={() => navigate("/register")}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-500/10 hover:shadow-lg"
          >
            Join CampusCluster <ArrowRight size={14} />
          </button>
          <button
            className="px-6 py-2.5 border border-slate-200 bg-white text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-all duration-200"
            onClick={() => navigate("/feedback")}
          >
            Send Feedback
          </button>
        </div>

        {/* Trust line */}
        <div className="mt-8 flex items-center gap-2.5 text-xs text-slate-400">
          <div className="flex -space-x-1.5">
            {["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-amber-500"].map((c, i) => (
              <div key={i} className={`w-5.5 h-5.5 rounded-full border-2 border-white ${c} shadow-xs`} />
            ))}
          </div>
          <span>Trusted by <strong className="text-slate-600 font-medium">20+</strong> students worldwide</span>
          <span className="flex items-center gap-0.5 text-amber-400 ml-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
          </span>
        </div>
      </header>

      {/* ── Stats Bar ── */}
      <div className="border-y border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {stats.map((s, i) => (
            <div key={i} className="py-4 text-center">
              <div className="text-xl font-bold text-slate-900 tracking-tight">{s.num}</div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="py-16 px-6 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">One platform. Intelligent features.</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">Everything your campus needs—no separate loose tools, zero context switching.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl border border-slate-100 p-5 hover:border-blue-200/60 hover:shadow-xs transition-all duration-200"
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3.5 ${iconBg[f.color] || "bg-slate-50"}`}>
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">CampusCluster Workflow</h2>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">From setup to smart optimization matrixes within six steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="bg-linear-to-br from-slate-50 via-white to-slate-50/30 rounded-xl p-5 border border-slate-100 flex gap-4">
                <span className="text-2xl font-extrabold text-blue-200/70 select-none tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ── */}
      <section className="py-16 px-6 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">Built for every role on campus</h2>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">Granular roles keeping structural pipelines clear and manageable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-xs">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold mb-3 ${r.bg}`}>
                  {r.initials}
                </div>
                <div className="font-semibold text-sm text-slate-900">{r.name}</div>
                <div className="text-[11px] text-slate-400 mb-4">{r.sub}</div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {r.perms.map((p, j) => (
                    <span key={j} className="text-[10px] px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-md text-slate-500 font-medium">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-6 py-8">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl px-6 py-10 sm:py-12 text-center text-white relative overflow-hidden shadow-xl shadow-blue-500/5">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-xl" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-black/10 rounded-full blur-xl" />

          <div className="relative z-10 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Ready to transform your campus?</h2>
            <p className="text-xs sm:text-sm text-blue-100 mb-6 leading-relaxed">
              Join thousands of modern learning environments building unified technical knowledge frameworks seamlessly today.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Create your campus — it&apos;s free <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-white px-6 py-6 text-xs text-slate-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-sm font-semibold text-slate-800">Campus<span className="text-blue-600">Cluster</span></span>
            <p className="text-[11px] text-slate-400 mt-0.5">© {new Date().getFullYear()} CampusCluster. All rights reserved.</p>
          </div>

          <div className="flex gap-4 font-medium text-slate-500">
            {["Features", "About", "Privacy", "Contact"].map((link) => (
              <a key={link} href="#" className="hover:text-blue-600 transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-2">
            {[
              { icon: <Mail size={13} />, url: "https://instagram.com/campuscluster", hover: "hover:text-pink-500 hover:bg-pink-50 hover:border-pink-100" },
              { icon: <Mail size={13} />, url: "https://twitter.com/campuscluster", hover: "hover:text-sky-500 hover:bg-sky-50 hover:border-sky-100" },
              { icon: <Mail size={13} />, url: "mailto:campuscluster@gmail.com", hover: "hover:text-red-500 hover:bg-red-50 hover:border-red-100" }
            ].map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 transition-all duration-200 ${item.hover}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;




