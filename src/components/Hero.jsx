import React, { Suspense } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { profile, socialLinks } from "../constants";
import useDeferredMount from "../hooks/useDeferredMount";
import { ComputersCanvas } from "./canvas";
import CanvasErrorBoundary from "./canvas/CanvasErrorBoundary";
import { DownloadIcon, socialIconMap } from "./Icons";

const Hero = () => {
  const show3D = useDeferredMount();

  return (
    <section
      className='relative w-full h-screen mx-auto overflow-hidden'
      aria-label='Introduction'
    >
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(145,94,255,0.18),transparent_55%)]' />

      {/* 3D scene: full width, pushed down so it doesn't cover the top buttons,
          and kept behind the content so the buttons stay clickable. */}
      <div
        className='absolute inset-x-0 top-[160px] bottom-0 z-0 pointer-events-auto'
        aria-hidden='true'
      >
        {show3D && (
          <CanvasErrorBoundary>
            <Suspense fallback={null}>
              <ComputersCanvas />
            </Suspense>
          </CanvasErrorBoundary>
        )}
      </div>

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10 pointer-events-none`}
      >
        <div className='flex flex-col justify-center items-center mt-5 pointer-events-auto'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div className='max-w-2xl pointer-events-auto'>
          <p className='text-secondary text-[13px] sm:text-[15px] font-medium tracking-wide'>
            {profile.role} · {profile.location.split(",")[0]}
          </p>

          <h1 className={`${styles.heroHeadText} text-white leading-tight`}>
            Hi, I'm <span className='sr-only'>Muhammad </span>
            <span className='text-[#915EFF] whitespace-nowrap'>Usman</span>
          </h1>

          <p
            className={`${styles.heroSubText} mt-3 text-white-100 max-w-xl leading-snug`}
          >
            I build fast, scalable web apps, AI-powered automations and
            high-performance storefronts.
          </p>

          <div className='mt-7 flex flex-wrap items-center gap-4'>
            <a
              href={profile.resume}
              download='Muhammad-Usman-CV.pdf'
              className='inline-flex items-center gap-2 rounded-xl bg-[#7c4ce0] px-5 py-3 text-[15px] font-semibold text-white shadow-lg shadow-[#915EFF]/30 transition hover:bg-[#6d3bd6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
              aria-label='Download Resume (PDF)'
            >
              <DownloadIcon className='w-5 h-5' />
              Download Resume
            </a>

            <a
              href='#projects'
              className='inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-[15px] font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              View Projects
            </a>
          </div>

          <ul className='mt-6 flex items-center gap-3' aria-label='Social links'>
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target={social.id === "email" ? undefined : "_blank"}
                    rel={social.id === "email" ? undefined : "noreferrer noopener"}
                    aria-label={social.name}
                    title={social.name}
                    className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-tertiary/70 text-secondary transition hover:border-[#915EFF]/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]'
                  >
                    <Icon className='w-[18px] h-[18px]' />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10 pointer-events-auto'>
        <a href='#about' aria-label='Scroll to about section'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;