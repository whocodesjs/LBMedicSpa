import React from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  delay = 0.2,
  className = "",
}: AnimatedCounterProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const [displayNumber, setDisplayNumber] = React.useState(from);

  const springValue = useSpring(from, {
    stiffness: 30,
    damping: 15,
  });

  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      setTimeout(() => {
        springValue.set(to);
        setHasAnimated(true);
      }, delay * 1000);
    }
  }, [isInView, hasAnimated, to, springValue, delay]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayNumber(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      {displayNumber}
      {to >= 100 ? "+" : ""}
    </span>
  );
}
