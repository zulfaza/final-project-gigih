import Navbar from 'components/navbar';
import { userNavigationType } from 'components/navbar/navbar';
import Sidebar from 'components/Sidebar/Sidebar';
import { deleteAccessToken } from 'core/redux/spotify';
import { selectorProps } from 'core/redux/store';
import { toggleShowSidebar } from 'core/redux/ui';
import React from 'react';
import { BsX } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  children: JSX.Element | string;
};

const DashboardLayout = ({ children }: Props) => {
  const isOpen = useSelector((state: selectorProps) => state.ui.showSidebar);
  const dispatch = useDispatch();
  const handleOnClose = () => dispatch(toggleShowSidebar());
  const userNavigation: userNavigationType[] = [
    { name: 'Sign out', onClick: () => dispatch(deleteAccessToken({})) },
  ];
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="md:grid grid-cols-10 overflow-hidden md:overflow-visible h-full">
          <div
            className={` absolute transform ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform md:translate-x-0 md:sticky top-0 col-span-2 w-full h-screen bg-dark-800 z-50`}
          >
            <div className="flex relative flex-col h-full">
              <div className=" absolute md:hidden right-0 p-4">
                <button onClick={handleOnClose} className="">
                  <BsX className="text-white text-opacity-70 w-10 h-10" />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
          <div className="col-span-8 ">
            <Navbar userNavigation={userNavigation} />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
