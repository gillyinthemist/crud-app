import {
  HomeIcon,
  IdentificationIcon,
  PowerIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { MicrophoneIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { Divider, Switch } from '@nextui-org/react';
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
    <div className="w-60 bg-blue-950 p-10 text-white flex flex-col gap-5 rounded-xl m-3">
      {/* Logo */}
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-extrabold flex gap-2 items-center">
          <IdentificationIcon width={40} />
          EMS
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-5 flex-grow mt-10">
        {menu.map((el, i) => (
          <Link key={i} to={el.link} className="flex gap-3">
            {el.icon}
            <p className="text-center">{el.title}</p>
          </Link>
        ))}
      </div>

      {/* Theme switcher (Not yet implemented*/}
      <div className="flex gap-3 justify-center items-center">
        Dark Mode:
        <Switch
          defaultSelected
          size="lg"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <SunIcon className={className} />
            ) : (
              <MoonIcon className={className} />
            )
          }
        ></Switch>
      </div>

      {/* Sign out */}
      <div className="flex flex-col gap-5">
        <Divider className="bg-blue-300" />
        <div className="flex gap-3">
          <PowerIcon width={25} />
          <p>Sign out</p>
        </div>
      </div>
    </div>
  );
}
