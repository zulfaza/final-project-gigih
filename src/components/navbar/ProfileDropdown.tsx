import { Menu, Transition } from '@headlessui/react';
import { selectorProps } from 'core/redux/store';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'utils/classNames';
import { userNavigationType } from './navbar';

type Props = {
  userNavigation: userNavigationType[];
};

const ProfileDropdown = ({ userNavigation }: Props) => {
  const user = useSelector((state: selectorProps) => state.spotify.user);

  if (!user) return <></>;
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user.images[0].url}
            alt=""
          />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block w-full text-left px-4 py-2 text-sm text-gray-700'
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

export default ProfileDropdown;
