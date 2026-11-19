import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        boxShadow: "0 10px 40px -20px rgba(0,0,0,0.9)",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg, color: "#fff" }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <span className='text-[13px] font-black tracking-wider text-white'>
            {experience.initials}
          </span>
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[22px] font-bold leading-tight'>
          {experience.title}
        </h3>
        <p
          className='text-secondary text-[15px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
          <span className='text-secondary/70 font-normal'>
            {" "}
            · {experience.location}
          </span>
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white-100 text-[14px] pl-1 leading-6'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className='mt-16 flex flex-col'>
        <VerticalTimeline lineColor='rgba(255,255,255,0.08)'>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company_name}-${experience.title}-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
