import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, } from "react-redux";
import type { RootState } from '../../store/store';

import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {

  const { token } = useSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (token) {
    }
  }, [token]);

  return (
    <>
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex h-[94vh] flex-row dark:bg-[#131314] ">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="px-4 py-2 flex-1 dark:text-white dark:bg-black overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>

      </div>

      {/* <Footer /> */}
    </>
  );
}