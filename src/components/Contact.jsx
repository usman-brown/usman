import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { profile, socialLinks } from "../constants";
import { CanvasGate, EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { MailIcon, socialIconMap } from "./Icons";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: profile.name,
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          setForm(initialForm);
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          console.error(error);
        }
      );
  };

  return (
    <div className='xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>

        <div className='mt-6 flex flex-col gap-2 text-[14px] text-secondary'>
          <a
            href={`mailto:${profile.email}`}
            className='inline-flex items-center gap-2 transition hover:text-white'
          >
            <MailIcon className='w-4 h-4' />
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className='inline-flex items-center gap-2 transition hover:text-white'
          >
            <span aria-hidden='true'>📞</span>
            {profile.phone}
          </a>
          <p className='inline-flex items-center gap-2'>
            <span aria-hidden='true'>📍</span>
            {profile.location}
          </p>
        </div>

        <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              required
              autoComplete='name'
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#915EFF] font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              autoComplete='email'
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#915EFF] font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              required
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-[#915EFF] font-medium'
            />
          </label>

          <div className='flex flex-wrap items-center gap-4'>
            <button
              type='submit'
              disabled={loading}
              className='bg-[#7c4ce0] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary transition hover:bg-[#6d3bd6] disabled:cursor-not-allowed disabled:opacity-70'
            >
              {loading ? "Sending..." : "Send message"}
            </button>

            <a
              href={profile.resume}
              download='Muhammad-Usman-CV.pdf'
              className='rounded-xl border border-white/20 px-6 py-3 text-[14px] font-semibold text-white transition hover:border-white/40 hover:bg-white/5'
            >
              Download CV
            </a>
          </div>

          <p
            aria-live='polite'
            className={`text-[13px] ${
              status === "error" ? "text-red-400" : "text-green-400"
            } ${status ? "block" : "hidden"}`}
          >
            {status === "success"
              ? "Thank you. I will get back to you as soon as possible."
              : status === "error"
              ? "Something went wrong. Please email me directly at " +
                profile.email
              : ""}
          </p>
        </form>

        <ul className='mt-8 flex items-center gap-3' aria-label='Social links'>
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
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='hidden md:block xl:flex-1 xl:h-auto md:h-[550px]'
        aria-hidden='true'
      >
        <CanvasGate className='w-full h-full' rootMargin='300px'>
          <EarthCanvas />
        </CanvasGate>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
