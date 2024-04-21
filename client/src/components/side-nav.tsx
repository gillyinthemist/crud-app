import { HomeIcon, PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import { Divider } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const menu = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    icon: <HomeIcon width={20} />,
  },
  {
    title: 'Employees',
    link: '/dashboard/employees',
    icon: <UserIcon width={20} />,
  },
];

export default function SideNav() {
  // RENDER:
  return (
    <div className="w-60 bg-slate-500 p-10 text-white flex flex-col gap-5">
      {/* Logo */}
      <div className="flex flex-col gap-5">
        <p className="italic">EMS</p>
        <Divider />
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-5 flex-grow mt-10">
        <p>Menu</p>
        <Divider />
        {menu.map((el, i) => (
          <Link key={i} to={el.link} className="flex gap-3">
            {el.icon}
            <p className="text-center">{el.title}</p>
          </Link>
        ))}
      </div>

      {/* Theme switcher */}
      <div className="flex flex-col gap-5">
        <div className="flex gap-3"> Theme switch</div>
      </div>

      {/* Sign out */}
      <div className="flex flex-col gap-5">
        <Divider />
        <div className="flex gap-3">
          <PowerIcon width={25} />
          <p>Sign out</p>
        </div>
      </div>
    </div>
  );
}
