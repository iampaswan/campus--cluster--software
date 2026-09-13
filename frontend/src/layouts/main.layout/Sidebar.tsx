// components/sidebar/Sidebar.tsx

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-44 h-full bg-gray-100 dark:bg-gray-900 dark:text-white border-r dark:border-gray-800">
      {/* <div className="p-4 text-xl font-bold">
        Project
      </div> */}

      <nav className="flex flex-col gap-2 p-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Explore Users</Link>

      </nav>
    </aside>
  );
}