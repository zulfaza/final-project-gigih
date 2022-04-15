import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import PlaylistCartButton from './PlaylistCartButton';
import MobileMenuButton from './MobileMenuButton';

type LinkType = {
  name: string;
  href: string;
};

export type Props = {
  navigation: LinkType[];
  userNavigation: {
    name: string;
    href: string;
  }[];
};

const Navbar = ({ userNavigation }: Props) => {
  return (
    <nav className=" bg-dark sticky top-0 border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <div className="">
            <div className="ml-4 flex items-center md:ml-6">
              <PlaylistCartButton />
              <ProfileDropdown userNavigation={userNavigation} />
            </div>
          </div>
          <div className="ml-3 flex md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
