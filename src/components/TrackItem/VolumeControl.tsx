import { Transition } from '@headlessui/react';
import React, { useState } from 'react';
import { BsVolumeUp } from 'react-icons/bs';

type Props = {
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  Volume: number;
};

const VolumeControl = ({ Volume, setVolume }: Props) => {
  const [ShowSlider, setShowSlider] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
      className="flex-ss flex-col relative w-min"
    >
      <Transition
        show={ShowSlider}
        appear={true}
        enter="transition-opacity"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-black bg-opacity-60 py-1 px-3 rounded-2xl absolute transform -translate-x-16 left-3 -translate-y-24 -rotate-90">
          <input
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="slider w-28 transform -translate-y-1"
            value={Volume}
            min={0}
            max={1.0}
            step="any"
            type="range"
          />
        </div>
      </Transition>
      <div className="bg-black bg-opacity-60 p-2 rounded-full">
        <BsVolumeUp className="text-white w-5 h-5" />
      </div>
    </div>
  );
};

export default VolumeControl;
