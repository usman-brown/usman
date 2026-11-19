import React from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const groups = ["Frontend", "Backend", "Data & CMS", "Cloud & Tools"];

const TechChip = ({ name, icon, index }) => (
  <motion.li
    variants={fadeIn("up", "spring", index * 0.03, 0.5)}
    className='flex items-center gap-2.5 rounded-xl border border-white/10 bg-tertiary/80 px-3.5 py-2.5 transition-colors hover:border-[#915EFF]/50'
  >
    {icon ? (
      <img
        src={icon}
        alt=''
        width='24'
        height='24'
        loading='lazy'
        decoding='async'
        className='h-6 w-6 object-contain'
      />
    ) : (
      <span
        aria-hidden='true'
        className='flex h-6 w-6 items-center justify-center rounded-md bg-[#915EFF]/20 text-[10px] font-black text-[#c4b5fd]'
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    )}
    <span className='text-[13px] font-medium text-white-100'>{name}</span>
  </motion.li>
);

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My toolbox</p>
        <h2 className={styles.sectionHeadText}>Skills & Technologies.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        The stack I use to design, build, ship and maintain products — from
        pixel-level interfaces to APIs, cloud deployments and AI integrations.
      </motion.p>

      <div className='mt-12 grid gap-8 md:grid-cols-2'>
        {groups.map((group) => {
          const items = technologies.filter((tech) => tech.group === group);
          if (!items.length) return null;

          return (
            <div key={group}>
              <h3 className='mb-4 text-[13px] font-semibold uppercase tracking-widest text-secondary'>
                {group}
              </h3>
              <ul className='flex flex-wrap gap-2.5'>
                {items.map((tech, index) => (
                  <TechChip key={tech.name} index={index} {...tech} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
