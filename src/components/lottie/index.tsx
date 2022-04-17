import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { randomString } from 'utils/make';

const Lottie = ({
  animation,
  className = '',
  settings = {
    loop: true,
  },
}: {
  animation: any;
  className?: string;
  settings?: {
    loop?: boolean | number;
    autoplay?: boolean;
  };
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const name = randomString();
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        animationData: animation,
        name,
        ...settings,
      });
    }
    return () => lottie.destroy(name);
  }, [animation, settings]);
  return <div className={className} ref={containerRef} />;
};

export default Lottie;
