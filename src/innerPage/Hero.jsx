import React from 'react';
import { SectionWrapper } from "../hoc";
import downArrow from '../assets/downArrow.png';
import earth_light from '../assets/earth_light.svg';
import { motion, useAnimation } from 'framer-motion';
import { slideIn, textVariant, zoomIn } from '../utils/motion';
import Logos from './Logos';

function Hero() {
  const controls = useAnimation();

  const handleHover = () => {
    controls.start({ x: [0, -5, 5, -5, 0], transition: { duration: 0.7 } });
  };

  return (
    <>
      <section className="hero mt-20 flex flex-col md:flex-row items-center justify-between w-full px-6 sm:px-12 lg:px-16 space-y-8 md:space-y-0">
        {/* Left Side (Text and Button) */}
        <motion.div
          variants={textVariant('.2')}
          className="hero-left flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 space-y-6"
        >
          <h1 className="hero-head text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Grow your subscription business
          </h1>
          <p className="hero-p text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
            Outcome-centered products that reduce churn, optimize pricing, and grow subscription business end-to-end.
          </p>

          <motion.div
            variants={slideIn('left', 'tween', '.5', '.3')}
            className="start flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              onHoverStart={handleHover}
              onHoverEnd={() => controls.start({ x: 0 })}
              animate={controls}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg"
            >
              Get Started
            </motion.button>

            <img
              src={downArrow}
              alt="navigate to bottom"
              className="cursor-pointer w-12 h-12"
            />
          </motion.div>
        </motion.div>

        {/* Right Side (Image) */}
        <div className="light-earth w-full md:w-1/2 flex justify-center md:justify-end">
          <motion.img
            variants={zoomIn('0.2', '1')}
            src={earth_light}
            alt="Earth Light"
            className="max-w-full h-auto md:h-[50vh] object-contain"
          />
        </div>
      </section>

      {/* Logos Section */}
      <Logos />
    </>
  );
}

export default SectionWrapper(Hero, 'hero');
