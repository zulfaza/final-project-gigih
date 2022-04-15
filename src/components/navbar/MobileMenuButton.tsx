import { selectorProps } from 'core/redux/store';
import { toggleShowSidebar } from 'core/redux/ui';
import React from 'react';
import { BsList, BsX } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

const MobileMenuButton = () => {
  const open = useSelector((state: selectorProps) => state.ui.showSidebar);
  const dispatch = useDispatch();

  const handleBtnOnclick = () => dispatch(toggleShowSidebar());

  return (
    <button
      onClick={handleBtnOnclick}
      className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    >
      <span className="sr-only">Open main menu</span>
      {open ? (
        <BsX className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <BsList className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};

export default MobileMenuButton;
