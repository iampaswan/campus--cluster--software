import { NavLink, useNavigate } from "react-router-dom";
import {
  UserIcon,
  LayoutDashboard,
  Users,
  MessageCircle,
  // UsersRound,
  Settings,
  CircleHelp,

  BellRing,
  // PhoneCall,
  ChartNoAxesCombined,
  // Calendar,
  // Building2Icon,

} from "lucide-react";
import { useState, useEffect } from "react";
import { getMe } from "../../configuration/authConfiguration";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Connections", path: "/users", icon: Users },
  { name: "Messages", path: "/messages", icon: MessageCircle },
  // { name: "Groups", path: "/groups", icon: UsersRound },
  // { name: "Calls Logs", path: "/calls", icon: PhoneCall },
  // { name: "Community", path: "/community", icon: UserStarIcon },
  // { name: "Workspace", path: "/workspace", icon: Building2Icon },
  { name: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
  { name: "Notification", path: "/notification", icon: BellRing },
  { name: "Settings", path: "/settings", icon: Settings },
  // { name: "Schedule", path: "/schedule", icon: Calendar },
  { name: "Help Center", path: "/help", icon: CircleHelp },
];

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const { token, user } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<any>(null);

  const navigate = useNavigate()

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      if (!token) return;
      const response = await getMe();
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity
        ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`
          flex flex-col
          fixed lg:static
          left-0 top-0 z-40 h-full
          w-16
          bg-white dark:bg-[#131314]
          border-r border-gray-100 dark:border-zinc-800
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Fixed Profile */}
        <div
          className="flex flex-col items-center py-3 shrink-0 cursor-pointer"
          onClick={() => navigate(`/profile/${user?._id}`)}
          title={user?.name}
        >
          {profile?.profileUrl ? (
            <img
              src={profile.profileUrl}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-800"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold">
              <UserIcon size={25} />
            </div>
          )}
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-1.5 pb-2 custom-scrollbar-sidebar">

          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  key={link.path}
                  to={link.path}
                  title={link.name}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-0.5  text-[8px] font-medium leading-tight text-center transition-colors ${isActive
                      ? "text-blue-700 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-gray-200/60 dark:hover:bg-white/5"
                          }`}
                      >
                        <Icon size={20} />
                      </div>

                      <span className="truncate w-full">{link.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
