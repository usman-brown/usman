import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { profile, services, stats } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon, description }) => (
  <Tilt className='xs:w-[250px] w-full' glareEnable={false}>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.15, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div className='bg-tertiary rounded-[20px] py-6 px-6 min-h-[260px] flex justify-evenly items-center flex-col text-center'>
        <img
          src={icon}
          alt=''
          width='64'
          height='64'
          loading='lazy'
          decoding='async'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[19px] font-bold'>{title}</h3>
        <p className='text-secondary text-[14px] leading-6'>{description}</p>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        {profile.summary}
      </motion.p>

      <motion.dl
        variants={fadeIn("up", "spring", 0.2, 0.75)}
        className='mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto justify-items-center'
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='flex flex-col-reverse rounded-2xl border border-white/10 bg-tertiary/70 px-4 py-4 text-center w-full'
          >
            <dt className='mt-2 text-secondary text-[13px]'>{stat.label}</dt>
            <dd className='text-white text-[26px] font-black leading-none'>
              {stat.value}
            </dd>
          </div>
        ))}
      </motion.dl>

      <div className='mt-16 flex flex-wrap gap-8 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
