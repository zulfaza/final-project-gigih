import React from 'react';
import Lottie from 'components/lottie';
import { Link } from 'react-router-dom';
import musicAnimation from 'components/lottie/animations/sound-equalizer-bars-music.json';
import { BsHouse, BsList } from 'react-icons/bs';
import SideLink from './SideLink';

const Links = [
  {
    label: 'Dashboard',
    href: '/create-playlist',
    icon: <BsHouse />,
  },
  {
    label: 'List Playlist',
    href: '/list-playlist',
    icon: <BsList />,
  },
];

const Sidebar = () => {
  return (
    <div className=" flex flex-col bg-dark-800 h-full border-r px-5 border-gray-700">
      <div className="flex items-center justify-center h-20 border-b border-accent border-opacity-50">
        <Link className="flex-cc" to="/">
          <Lottie className="h-16 w-16" animation={musicAnimation} />
        </Link>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4">
          <li className="">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">
                Menu
              </div>
            </div>
          </li>
          {Links.map((data) => (
            <SideLink key={data.label} {...data} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
