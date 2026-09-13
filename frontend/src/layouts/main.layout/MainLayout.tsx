// layouts/MainLayout.tsx
import Header from './Header';
import Sidebar from './Sidebar';
// import Footer from './Footer';

import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Header />

      <div className="flex h-[94vh] flex-row">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>

      {/* <Footer /> */}
    </>
  );
}