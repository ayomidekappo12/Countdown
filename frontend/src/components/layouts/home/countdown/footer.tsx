"use client";
import React from "react";
import {
  FaLinkedin,
  FaTiktok,
  FaSquareXTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa6";
import { motion } from "framer-motion";

const iconClasses =
  "text-black w-[13.19px] h-[13.9px] md:w-[18px] md:h-[18px] lg:w-[13.19px] lg:h-[13.9px] transition-transform duration-300 ease-in-out";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center gap-5 md:gap-6 lg:gap-5">
      <motion.a
        href="https://www.linkedin.com/company/synaradev/"
        target="_blank"
        className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
      >
        <FaLinkedin className={iconClasses} />
      </motion.a>

      <motion.a
        href="http://www.tiktok.com/@synaradev"
        target="_blank"
        className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
      >
        <FaTiktok className={iconClasses} />
      </motion.a>

      <motion.a
        href="https://x.com/synaradev"
        target="_blank"
        className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
      >
        <FaSquareXTwitter className={iconClasses} />
      </motion.a>

      <motion.a
        href="https://web.facebook.com/SynaraDev/"
        target="_blank"
        className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
      >
        <FaFacebook className={iconClasses} />
      </motion.a>

      <motion.a
        href="https://www.youtube.com/@SynaraDev"
        target="_blank"
        className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.2 }}
      >
        <FaYoutube className={iconClasses} />
      </motion.a>
    </div>
  );
};

export default Footer;
