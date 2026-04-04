import { Outlet } from 'react-router-dom';

import { Sidebar } from './Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};
