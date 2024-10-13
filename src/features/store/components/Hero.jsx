import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Hero = () => {
  const hero = useRef(null);
  useEffect(() => {
    const heroRef = hero.current;
    gsap.fromTo(
      heroRef,
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
      }
    );
  }, []);

  return (
    <div>
      <h1>Our Shop</h1>
      <h5>Where you can find EVERYTHING you need for your little fur baby!</h5>
    </div>
  );
};

export default Hero;
