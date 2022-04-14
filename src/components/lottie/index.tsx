import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const Lottie = ({
  animation,
  className = "",
}: {
  animation: any;
  className?: string;
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        animationData: animation,
      });
    }
    return () => lottie.destroy();
  }, [animation]);
  return <div className={className} ref={containerRef} />;
};

export default Lottie;
