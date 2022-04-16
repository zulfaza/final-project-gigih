import Lottie from 'components/lottie';
import { success } from 'components/lottie/animations';
import React from 'react';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuccessMessage = ({ setIsOpen, setSuccess }: Props) => {
  return (
    <div className="w-full flex-cc flex-col">
      <div className="flex-cc w-full">
        <Lottie
          settings={{ loop: false }}
          className="w-32 h-32"
          animation={success}
        />
      </div>
      <h2 className="text-white my-4 text-center">Success created playlist</h2>
      <button
        onClick={() => {
          setIsOpen(false);
          setSuccess(false);
        }}
        className="bg-accent disabled:opacity-75 px-2 py-2 rounded-md font-semibold w-full"
      >
        Close
      </button>
    </div>
  );
};

export default SuccessMessage;
