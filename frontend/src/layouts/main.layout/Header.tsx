import { useSelector, useDispatch, } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Power, Menu, Search, Bell, ChevronDown, User, CircleHelp, Settings } from "lucide-react";
import { ThemeToggle } from "../../utils/theme-toggle";
import { useState } from "react";



type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function Header({ sidebarOpen, setSidebarOpen }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const [profileOpen, setProfileOpen] = useState(false);


  const handleLogout = async () => {


    dispatch(logout());
    navigate("/", { replace: true });
  };


  return (
    <div className="h-[6vh] dark:bg-[#131314] border-b border-gray-100 dark:border-zinc-800 flex">
      <div className="flex flex-row justify-between items-center dark:text-white px-3  w-full text-center border-dark:border-b-white">

        {/* Mobile Menu */}
        <div className="flex lg:hidden ">
          <button
            className="lg:hidden rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={18} />
          </button>

       
        </div>



        <h1 className=" flex items-center">
         
          <div className=" text-lg font-bold hidden lg:block">
            <span className="chat-text">Campus</span>
            <span className="pulse-text text-blue-700 dark:text-blue-600">
              Cluster
            </span>
          </div>
        </h1>





        <div className="flex flex-row justify-center items-center gap-2 ">

          {/* notification */}
          <button
            onClick={() => navigate('/uread-notification')}
            className="relative rounded-full p-1 hover:text-yellow-500  hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Recent Notification"
          >
            <Bell size={18} />

            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {/* global search */}
          <div className="hidden lg:block">
            <div className="relative group">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 transition-colors duration-200 group-focus-within:text-blue-500"
              />
              <input
                placeholder="Search CampusCluster..."
                className="w-full border border-gray-200 dark:border-zinc-800 rounded-full pl-11 pr-4 py-0.5 bg-gray-50/50 dark:bg-zinc-900/50 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
              />

            </div>
          </div>



          <ThemeToggle />

          <div className="flex gap-1 items-center cursor-pointer hover:text-blue-700 "
            onClick={() => setProfileOpen((prev) => !prev)}

          >
            <p className="text-md font-bold text-gray-700 dark:text-gray-300 hidden lg:block hover:text-blue-700 dark:hover:text-blue-600">
              {user?.name}</p>
            <ChevronDown
              size={18}
              className={`hover:text-blue-700  transition-transform  ${profileOpen ? "rotate-180" : ""
                }`}

            />
          </div>


        </div>
      </div>



      {/* Profile Popup */}
      {profileOpen && (
        <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-[#1c1c1f]">

          {/* Profile Header */}
          <div className="border-b border-gray-100 px-4 py-4 dark:border-zinc-700">

            <div className="flex items-center gap-3">

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-[#1c1c1f]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {user?.name}
                </p>

                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>

            </div>
          </div>

          {/* Menu */}
          <div className="p-2">

            <button
              onClick={() => {
                setProfileOpen(false);
                navigate("/profile");
              }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
            >
              <User size={17} />
              <span>Profile</span>
            </button>

            <button
              onClick={() => {
                setProfileOpen(false);
                navigate("/settings");
              }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>

            <button
              onClick={() => {
                setProfileOpen(false);
                navigate("/help");
              }}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
            >
              <CircleHelp size={17} />
              <span>Help Center</span>
            </button>

          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 p-2 dark:border-zinc-700">

            <button
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <Power size={17} />
              <span>Logout</span>
            </button>

          </div>

        </div>
      )}

    </div >
  );

};


