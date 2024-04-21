import { Outlet } from 'react-router-dom';
import SideNav from '../components/side-nav';

export default function DashboardLayout() {
  // RENDER:
  return (
    <div className="flex-grow flex flex-row w-screen">
      <SideNav />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
