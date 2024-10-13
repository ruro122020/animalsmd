import React, { useLayoutEffect, useEffect, useRef } from "react";
import puppy from "../assets/home-media/puppy.jpg";
import { useNavigate } from "react-router-dom";
import bird from "../assets/home-media/bird.jpg";
import cat from "../assets/home-media/cat.jpg";
import lizard from "../assets/home-media/lizard.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger)

const HowItWorks = () => {
  // const dogImg = useRef(null)
  // const lizardImg = useRef(null)
  // const birdImg = useRef(null)
  // const catImg = useRef(null)

  // //dogImg animation
  // useEffect(() => {
  //   const elBird = birdImg.current
  //   const elDog = dogImg.current
  //   const elLizard = lizardImg.current
  //   const elCat = catImg.current

  //   gsap.fromTo(elBird, {
  //     x: -600,
  //   }, {
  //     x: -15,
  //     ease: 'power4',
  //     duration: 4,
  //     scrollTrigger: elBird
  //   })

  //   gsap.fromTo(elDog, {
  //     x: 600,
  //   }, {
  //     x: 0,
  //     ease: 'power4',
  //     duration: 4,
  //     scrollTrigger: elDog
  //   })

  //   gsap.fromTo(elLizard, {
  //     x: -600,
  //   }, {
  //     x: -15,
  //     ease: 'power4',
  //     duration: 4,
  //     scrollTrigger: elLizard
  //   })

  //   gsap.fromTo(elCat, {
  //     x: 600,
  //   }, {
  //     x: 0,
  //     ease: 'power4',
  //     duration: 4,
  //     scrollTrigger: elCat
  //   })
  // }, [])

  return (
    <div>
      <div>
        {/*BLOCK ONE */}
        <div>
          <div>
            <h4>Create Account</h4>

            <p>
              AnimalsMD empowers pet owners with the information and tools they
              need to manage their pet's health, ensuring their furry friends
              receive the best possible care.
            </p>
          </div>

          {/**the box component is the image */}
          <div />
        </div>

        {/*BLOCK TWO */}

        <div>
          {/**the box component is the image */}
          <div />

          <div>
            <h4>Pet Assessment Tool</h4>
            <p>
              Users can input their pet's symptoms into the assessment tool,
              which then generates a diagnosis with potential illnesses,
              non-invasive remedies, treatments, and medications.
            </p>
          </div>
        </div>

        {/*BLOCK THREE */}
        <div>
          {/**the box component is the image */}
          <div>
            <h4>Prescription Medication</h4>
            <p>
              With veterinary approval, users can conveniently purchase
              prescription medications directly through the website.
            </p>
          </div>
          <div />
        </div>

        {/*BLOCK  FOUR*/}
        <div>
          {/**the box component is the image */}
          <div />
          <div>
            <h4>Health Records</h4>
            <p>
              AnimalsMD allows users to keep a detailed record of all
              assessments, making it easy to track the health history of both
              current and previous pets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
