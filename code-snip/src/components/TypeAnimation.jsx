import React from "react";
import Typewriter from "typewriter-effect";

const TypeAnimation = () => {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Engineer",
          "Full Stack Developer",
          "Frontend Developer",
          "DSA Enthusiast",
          "Curious Learner",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 60,
        
      }}
    />
  );
};

export default TypeAnimation;
