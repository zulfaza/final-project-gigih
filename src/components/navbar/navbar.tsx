import React, { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import PlaylistCartButton from './PlaylistCartButton';
import MobileMenuButton from './MobileMenuButton';
import ModalCratePlaylist from './ModalCratePlaylist';

export type userNavigationType = {
  name: string;
  onClick: (arg0: any) => void;
};

export type Props = {
  userNavigation: userNavigationType[];
};

const Navbar = ({ userNavigation }: Props) => {
  const [openModalCreatePlayList, setOpenModalCreatePlayList] = useState(false);
  return (
    <>
      <nav className=" bg-dark sticky z-50 top-0 border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex relative items-center justify-end h-16">
            <div className="">
              <div className="ml-4 flex items-center md:ml-6">
                <PlaylistCartButton setIsOpen={setOpenModalCreatePlayList} />
                <ProfileDropdown userNavigation={userNavigation} />
              </div>
            </div>
            <div className="ml-3 flex md:hidden">
              <MobileMenuButton />
            </div>
          </div>
        </div>
      </nav>
      <ModalCratePlaylist
        setIsOpen={setOpenModalCreatePlayList}
        isOpen={openModalCreatePlayList}
      />
    </>
  );
};

export default Navbar;
