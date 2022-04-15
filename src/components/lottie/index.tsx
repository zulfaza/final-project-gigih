import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import { randonString } from 'utils/make';

const Lottie = ({
  animation,
  className = '',
}: {
  animation: any;
  className?: string;
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const name = randonString();
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        animationData: animation,
        name,
      });
    }
    return () => lottie.destroy(name);
  }, [animation]);
  return <div className={className} ref={containerRef} />;
};

export default Lottie;
