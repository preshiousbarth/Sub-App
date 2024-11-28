import React from 'react'
import { SectionWrapper } from "../hoc"
import downArrow from '../assets/downArrow.png'
import  earth_light  from '../assets/earth_light.svg'
import { motion, useAnimation  } from 'framer-motion'
import { slideIn, textVariant, zoomIn } from '../utils/motion'
import Logos from './Logos'





function Hero() {
  const controls = useAnimation();

  const handleHover = () => {
    controls.start({ x: [0, -5, 5, -5, 0], transition: { duration: 0.7 } });
  };

  return (
    <>
      <section className="hero mt-20 flex flex-col md:flex-row items-center justify-between w-full px-6 sm:px-8 lg:px-16">
        {/* Left Side (Text and Button) */}
        <motion.div
          variants={textVariant('.2')}
          className="hero-left flex flex-col items-start md:w-1/2 w-full text-center md:text-left"
        >
          <h1 className="hero-head text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            Grow your subscription business
          </h1>
          <p className="hero-p text-[#696871] text-base sm:text-lg md:text-xl leading-[30px] tracking-[-0.63px] mb-6">
            Outcome centered products that reduce churn, optimize pricing, and grow subscription business end-to-end.
          </p>

          <motion.div
            variants={slideIn('left', 'tween', '.5', '.3')}
            className="start mt-8 flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-center space-x-4"
          >
            <motion.button
              onHoverStart={handleHover}
              onHoverEnd={() => controls.start({ x: 0 })}
              animate={controls}
              className="w-full sm:w-auto h-[50px] bg-[#5454D4] text-white rounded-xl text-[17px] mb-4 sm:mb-0"
            >
              Get Started
            </motion.button>

            <img
              src={downArrow}
              alt="navigate to bottom"
              className="cursor-pointer w-[50px] h-[60px] sm:ml-4"
            />
          </motion.div>
        </motion.div>

        {/* Right Side (Image) */}
        <div className="light-earth w-full md:w-1/2 overflow-hidden mt-8 md:mt-0">
          <motion.img
            variants={zoomIn('0.2', '1')}
            src={earth_light}
            alt="Earth Light"
            className="w-full h-auto md:h-[70vh] mt-[-12vh] md:mt-[-8vh] object-cover"
          />
        </div>
      </section>

      {/* Logos Section */}
      <Logos />
    </>
  );
}

export default SectionWrapper(Hero, 'hero');