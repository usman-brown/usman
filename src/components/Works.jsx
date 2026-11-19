import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { profile, projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { ArrowUpRightIcon } from "./Icons";

const tagColors = ["blue-text-gradient", "green-text-gradient", "pink-text-gradient", "orange-text-gradient"];

const ProjectCard = ({ index, project }) => {
  const {
    name,
    category,
    description,
    tags,
    highlights,
    cover,
    initials,
    year,
    link,
    note,
    image,
  } = project;

  return (
    <motion.article
      variants={fadeIn("up", "spring", index * 0.12, 0.75)}
      className='sm:w-[270px] w-full group'
    >
      <Tilt
        glareEnable={false}
        className='bg-tertiary p-3 rounded-2xl h-full flex flex-col'
      >
        {image ? (
          <div className='relative w-full h-[120px] rounded-2xl overflow-hidden bg-black-200'>
            <img
              src={image}
              alt={`${name} screenshot`}
              loading={index < 6 ? 'eager' : 'lazy'}
              decoding='async'
              fetchPriority={index < 3 ? 'high' : 'auto'}
              className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />
            <span className='absolute bottom-3 left-4 text-[44px] font-black leading-none text-white/30'>
              {initials}
            </span>
            <span className='absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm'>
              {year}
            </span>
          </div>
        ) : (
          <div
            className={`relative w-full h-[120px] rounded-2xl overflow-hidden bg-gradient-to-br ${cover}`}
            aria-hidden='true'
          >
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_60%)]' />
            <div className='absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(0,0,0,0.35)_100%)]' />
            <span className='absolute bottom-3 left-4 text-[58px] font-black leading-none text-white/25'>
              {initials}
            </span>
            <span className='absolute right-3 top-3 rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm'>
              {year}
            </span>
          </div>
        )}

        <div className='mt-5 flex flex-1 flex-col'>
          <p className='text-[11px] font-semibold uppercase tracking-wider text-secondary'>
            {category}
          </p>
          <h3 className='mt-1 text-white font-bold text-[19px] leading-tight'>
            {name}
          </h3>
          <p className='mt-2 text-secondary text-[13px] leading-5 line-clamp-3'>
            {description}
          </p>

          <ul className='mt-3 space-y-1'>
            {highlights.slice(0, 2).map((highlight) => (
              <li
                key={highlight}
                className='flex items-start gap-2 text-[12px] text-white-100'
              >
                <span
                  aria-hidden='true'
                  className='mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#915EFF]'
                />
                {highlight}
              </li>
            ))}
          </ul>

          <div className='mt-3 flex flex-wrap gap-x-2.5 gap-y-0.5'>
            {tags.map((tag, i) => (
              <span
                key={`${name}-${tag}`}
                className={`text-[12px] font-medium ${tagColors[i % tagColors.length]}`}
              >
                #{tag.toLowerCase().replace(/\s+/g, "-")}
              </span>
            ))}
          </div>

          <div className='mt-auto pt-5'>
            {link ? (
              <a
                href={link}
                target='_blank'
                rel='noreferrer noopener'
                className='inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#c4b5fd] transition hover:text-white'
                aria-label={`Open ${name}`}
              >
                View project <ArrowUpRightIcon className='w-4 h-4' />
              </a>
            ) : (
              <span className='text-[12px] text-secondary/70'>{note}</span>
            )}
          </div>
        </div>
      </Tilt>
    </motion.article>
  );
};

const INITIAL_VISIBLE = 9;

const Works = () => {
  const [visible, setVisible] = useState(INITIAL_VISIBLE);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-2 text-secondary text-[16px] max-w-3xl leading-[26px]'
        >
          A selection of products I have designed, built and shipped — from
          real-estate and matrimonial platforms to CRM dashboards, AI booking
          systems and data-driven tools.
        </motion.p>
      </div>

      <div className='mt-8 flex flex-wrap gap-4'>
        {projects.slice(0, visible).map((project, index) => (
          <ProjectCard key={project.name} index={index} project={project} />
        ))}
      </div>

      {visible < projects.length && (
        <div className='mt-8 flex justify-center'>
          <button
            type='button'
            onClick={() => setVisible((v) => Math.min(v + 9, projects.length))}
            className='rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-[14px] font-semibold text-white transition hover:border-white/40 hover:bg-white/10'
          >
            Load more ({projects.length - visible} remaining)
          </button>
        </div>
      )}

      <div className='mt-6'>
        <a
          href={profile.portfolio}
          target='_blank'
          rel='noreferrer noopener'
          className='inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-[14px] font-semibold text-white transition hover:border-white/40 hover:bg-white/10'
        >
          See more on my portfolio
          <ArrowUpRightIcon className='w-4 h-4' />
        </a>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
