import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { achievements } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const icons = {
  trophy: (
    <path d='M6 3h12v2h3a1 1 0 0 1 1 1v1a5 5 0 0 1-4.6 4.98A6.002 6.002 0 0 1 13 15.9V18h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3v-2.1a6.002 6.002 0 0 1-4.4-3.92A5 5 0 0 1 2 7V6a1 1 0 0 1 1-1h3V3Zm0 4H4v0a3 3 0 0 0 2 2.83V7Zm12 0v2.83A3 3 0 0 0 20 7v0h-2Z' />
  ),
  code: (
    <path d='M8.7 6.3a1 1 0 0 1 0 1.4L4.4 12l4.3 4.3a1 1 0 0 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Zm6.6 0a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l4.3-4.3-4.3-4.3a1 1 0 0 1 0-1.4ZM13.9 3.1a1 1 0 0 1 .7 1.2l-3 16a1 1 0 0 1-2-.4l3-16a1 1 0 0 1 1.3-.8Z' />
  ),
  users: (
    <path d='M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-7 15a7 7 0 0 1 14 0 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Zm14.5-13.8a1 1 0 0 1 1.2-.7A4 4 0 0 1 17 11.9a1 1 0 1 1-.4-2 2 2 0 0 0 0-3.7 1 1 0 0 1-.7-1.2ZM18.2 15a6.97 6.97 0 0 1 1.8 4 1 1 0 0 1-1 1h-1.5a1 1 0 0 0 0-2h.5a5 5 0 0 0-1-2.8 1 1 0 0 1 1.2-1.2Z' />
  ),
  shield: (
    <path d='M12 2a1 1 0 0 1 .4.1l8 3A1 1 0 0 1 21 6v6c0 5-3.6 8.7-8.6 9.9a1 1 0 0 1-.8 0C6.6 20.7 3 17 3 12V6a1 1 0 0 1 .6-.9l8-3A1 1 0 0 1 12 2Zm0 2.1L5 6.7V12c0 3.8 2.6 6.8 7 7.9 4.4-1.1 7-4.1 7-7.9V6.7l-7-2.6Zm3.7 5.3a1 1 0 0 1 0 1.4l-4.2 4.2a1 1 0 0 1-1.4 0L8 12.9a1 1 0 1 1 1.4-1.4l1.4 1.4 3.5-3.5a1 1 0 0 1 1.4 0Z' />
  ),
  cap: (
    <path d='M11.5 3.1a1 1 0 0 1 1 0l9 4.5a1 1 0 0 1 0 1.8l-9 4.5a1 1 0 0 1-1 0L6 11v4.5a1 1 0 1 1-2 0V9.3L2.5 8.4a1 1 0 0 1 0-1.8l9-4.5ZM12 5 5.6 8.2 12 11.4l6.4-3.2L12 5Zm6 5.2-5 2.5a2 2 0 0 1-2 0l-3-1.5V15c0 1.7 1.8 3 5 3s5-1.3 5-3v-4.8Z' />
  ),
  spark: (
    <path d='M12 2a1 1 0 0 1 .9.6l2.1 4.7 5.1.5a1 1 0 0 1 .6 1.7l-3.8 3.4 1.1 5a1 1 0 0 1-1.5 1.1L12 16.4 7.5 19a1 1 0 0 1-1.5-1.1l1.1-5L3.3 9.5a1 1 0 0 1 .6-1.7l5.1-.5L11.1 2.6A1 1 0 0 1 12 2Z' />
  ),
};

const AchievementCard = ({ item, index }) => (
  <motion.li
    variants={fadeIn("up", "spring", index * 0.08, 0.6)}
    className='rounded-2xl border border-white/10 bg-black-200/80 p-6 flex gap-4'
  >
    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#915EFF]/15 text-[#c4b5fd]'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
        className='h-6 w-6'
      >
        {icons[item.icon]}
      </svg>
    </span>

    <div>
      <h3 className='text-white text-[17px] font-bold leading-snug'>
        {item.title}
      </h3>
      <p className='mt-1 text-[12px] font-medium uppercase tracking-wider text-secondary'>
        {item.meta}
      </p>
      <p className='mt-3 text-secondary text-[14px] leading-6'>
        {item.description}
      </p>
    </div>
  </motion.li>
);

const Achievements = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Beyond the code</p>
        <h2 className={styles.sectionHeadText}>Achievements & Leadership.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        Hackathon wins, community leadership and volunteer work that shaped how
        I build and collaborate with teams.
      </motion.p>

      <motion.ul className='mt-12 grid gap-5 sm:grid-cols-2'>
        {achievements.map((item, index) => (
          <AchievementCard key={item.id} item={item} index={index} />
        ))}
      </motion.ul>
    </>
  );
};

export default SectionWrapper(Achievements, "achievements");
