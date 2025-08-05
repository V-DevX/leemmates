import React from "react";
import Lottie from "lottie-react";

/**
 * A wrapper around lottie-react that never SSRs,
 * but since Vite is client‐only, we import directly.
 *
 * @param {{ animationData: object, width?: string }} props
 */
const AnimationLottie = ({ animationData, width = "100%" }) => {
  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{
        width,
        margin: "0 auto",
      }}
    />
  );
};

export default AnimationLottie;
