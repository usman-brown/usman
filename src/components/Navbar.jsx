import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks, profile } from "../constants";
import { logo, menu, close } from "../assets";
import { DownloadIcon } from "./Icons";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label='Primary navigation'
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-colors duration-300 ${
        scrolled ? "bg-primary/90 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          aria-label='Muhammad Usman — back to top'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt=''
            width='36'
            height='36'
            className='w-9 h-9 object-contain'
          />
          <p className='text-white text-[17px] font-bold cursor-pointer flex items-center'>
            Muhammad Usman
            <span className='hidden lg:block text-secondary font-medium'>
              &nbsp;| Full-Stack Developer
            </span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row items-center gap-8'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[16px] font-medium cursor-pointer transition-colors`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}

          <li>
            <a
              href={profile.resume}
              download='Muhammad-Usman-CV.pdf'
              className='inline-flex items-center gap-2 rounded-lg bg-[#7c4ce0] px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-[#6d3bd6] focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            >
              <DownloadIcon className='w-4 h-4' />
              Resume
            </a>
          </li>
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <button
            type='button'
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
            className='p-1'
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt=''
              width='28'
              height='28'
              className='w-[28px] h-[28px] object-contain'
            />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[190px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li onClick={() => setToggle(false)}>
                <a
                  href={profile.resume}
                  download='Muhammad-Usman-CV.pdf'
                  className='inline-flex items-center gap-2 rounded-lg bg-[#7c4ce0] px-4 py-2 text-[14px] font-semibold text-white'
                >
                  <DownloadIcon className='w-4 h-4' />
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
