// import { ClerkProvider } from '@clerk/clerk-react';
// import Navbar from '../components/sidebar';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  // RENDER:
  return (
    <div className="flex flex-col h-screen justify-between">
      {/* <header className="bg-slate-700">Header</header> */}
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </div>
  );
}
