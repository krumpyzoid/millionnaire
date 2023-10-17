import React from "react";
import { useCountdown } from "./useCountdown.tsx";
import { animated, useSpring } from "react-spring";

export const Countdown: React.FC = () => {
  const secondsLeft = useCountdown(15);
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  // Animation config
  const props = useSpring({
    opacity: 1,
    transform: "scale(1.2)",
    from: {
      opacity: 0.5,
      transform: "scale(1)",
    },
    config: {
      tension: 170,
      friction: 12,
    },
    reset: true, // This ensures the animation is triggered upon each render
  });

  return (
    <div>
      <animated.div style={props}>
        <span>
          {minutes > minutes ? minutes : "00"}:
          {seconds > 9 ? seconds : "0" + seconds}{" "}
        </span>
      </animated.div>
    </div>
  );
};
