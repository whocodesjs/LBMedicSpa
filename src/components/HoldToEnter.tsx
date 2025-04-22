import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface HoldToEnterProps {
  onComplete: () => void;
}

// Base size constants (Mobile-first)
const BASE_RADIUS = 50; // Radius for mobile
const BASE_SVG_SIZE = 220; // SVG dimensions for mobile
const BASE_VIEWBOX_SIZE = 110; // Viewbox to keep stroke within bounds
const STROKE_WIDTH = 6;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * BASE_RADIUS;

const HoldToEnter = ({ onComplete }: HoldToEnterProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const controls = useAnimation();
  const pathControls = useAnimation();

  // Effect to set the initial state of animations on mount
  useEffect(() => {
    pathControls.set({ strokeDashoffset: CIRCLE_CIRCUMFERENCE });
    controls.set({ scale: 1 });
  }, [controls, pathControls]);

  // Effect to handle starting and stopping animations based on isHolding
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isHolding) {
      controls.start({
        scale: 0.95,
        transition: { duration: 0.15, ease: "easeOut" },
      });
      pathControls.start({
        strokeDashoffset: 0,
        transition: { duration: 2.5, ease: "easeInOut" },
      });

      timeout = setTimeout(onComplete, 2500);

      return () => {
        clearTimeout(timeout);
        pathControls.stop();
      };
    } else {
      controls.start({
        scale: 1,
        transition: { duration: 0.2, ease: "easeIn" },
      });
      pathControls.start({
        strokeDashoffset: CIRCLE_CIRCUMFERENCE,
        transition: { duration: 0.3, ease: "easeOut" },
      });
    }
  }, [isHolding, onComplete, controls, pathControls]);

  const svgCenter = BASE_VIEWBOX_SIZE / 2;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {/* Base container size for mobile, larger for medium screens and up */}
      <div className="relative flex items-center justify-center w-[80vw] h-[80vw] max-w-[240px] max-h-[240px] md:max-w-[320px] md:max-h-[320px]">
        <svg
          // Use max-w/max-h on parent to control SVG size indirectly for responsiveness
          width="100%" // Fill container
          height="100%" // Fill container
          viewBox={`0 0 ${BASE_VIEWBOX_SIZE} ${BASE_VIEWBOX_SIZE}`} // Consistent viewbox
          className="absolute transform -rotate-90">
          {/* Background circle track */}
          <circle
            cx={svgCenter}
            cy={svgCenter}
            r={BASE_RADIUS}
            stroke="#444"
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx={svgCenter}
            cy={svgCenter}
            r={BASE_RADIUS}
            stroke="#0A84FF"
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            animate={pathControls}
            strokeLinecap="round"
          />
        </svg>
        {/* Button maintains consistent style, scales with container */}
        <motion.button
          // Adjusted padding slightly for different text sizes
          className="absolute px-5 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium text-black bg-white rounded-full shadow-lg focus:outline-none"
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          animate={controls}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}>
          Hold to Enter
        </motion.button>
      </div>
    </div>
  );
};

export default React.memo(HoldToEnter);
