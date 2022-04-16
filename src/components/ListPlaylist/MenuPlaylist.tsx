import { Menu, Transition } from '@headlessui/react';
import { userType } from 'core/redux/spotify';
import { selectorProps } from 'core/redux/store';
import { PlaylistType } from 'pages/ListPlaylist';
import React, { Fragment } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import classNames from 'utils/classNames';

type Props = {
  links: {
    name: string;
    onClick: (uri: string) => void;
  }[];
  playlist: PlaylistType;
};

const MenuPlaylist = ({ links, playlist }: Props) => {
  const user: userType | { id: string | null } = useSelector(
    (state: selectorProps) => state.spotify.user
  ) ?? { id: null };
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className=" text-white text-opacity-50 group-hover:text-opacity-100 bg-gray-800 rounded px-2 py-1 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open playlist menu</span>
          <BsThreeDots className="w-5 h-5" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-dark-800 bg-opacity-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
          {links
            .filter(
              (item) => playlist.owner.id == user.id || item.name === 'Delete'
            )
            .map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    onClick={() => item.onClick(playlist.id)}
                    className={classNames(
                      active ? ' text-opacity-100' : '',
                      'block w-full text-left px-4 py-2 text-sm transition-colors text-white text-opacity-40'
                    )}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuPlaylist;
