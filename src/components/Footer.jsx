import React from "react";

import { navLinks, profile, socialLinks } from "../constants";
import { socialIconMap } from "./Icons";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='relative z-10 border-t border-white/10 bg-black-200/80'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-16 md:flex-row md:items-start md:justify-between'>
        <div className='max-w-sm'>
          <p className='text-[18px] font-bold text-white'>{profile.name}</p>
          <p className='mt-2 text-[14px] leading-6 text-secondary'>
            {profile.role} based in {profile.location}. {profile.availability}.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className='mt-3 inline-block text-[14px] font-medium text-[#c4b5fd] transition hover:text-white'
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label='Footer navigation'>
          <h2 className='text-[12px] font-semibold uppercase tracking-widest text-secondary'>
            Sections
          </h2>
          <ul className='mt-3 space-y-2'>
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <a
                  href={`#${nav.id}`}
                  className='text-[14px] text-white-100 transition hover:text-[#c4b5fd]'
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className='text-[12px] font-semibold uppercase tracking-widest text-secondary'>
            Elsewhere
          </h2>
          <ul className='mt-3 flex items-center gap-3'>
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
                    className='flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-secondary transition hover:border-[#915EFF]/60 hover:text-white'
                  >
                    <Icon className='w-4 h-4' />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className='border-t border-white/5 px-6 py-5 text-center text-[12px] text-secondary sm:px-16'>
        © {year} {profile.name}. Built with React, Three.js and Tailwind CSS.
      </div>
    </footer>
  );
};

export default Footer;
