'use client';
import React from 'react'
import { FaLinkedin, FaTiktok, FaSquareXTwitter, FaFacebook, FaYoutube  } from "react-icons/fa6";
import {motion} from "framer-motion"






const Footer = () => {
  return (
    <div className='w-full h-[100px] md:h-[150px] lg:h-[100px] flex items-center justify-center gap-[4px] md:gap-[8px] lg:gap-[4px]'>
      <motion.a 
      href=''
      whileHover={{
        y: [0, -4, 4, -4, 4, 0],
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className='w-[21.98px] h-[21.98px] md:w-[30px] md:h-[30px] lg:w-[21.98px] lg:h-[21.98px] bg-white rounded-full flex items-center justify-center hover:w-[40px] hover:h-[40px] group transition-transform duration-500 ease-in-out'><FaLinkedin className='text-center w-[13.19px] h-[13.9px] md:w-[18px] md:h-[18px] lg:w-[13.19px] lg:h-[13.9px] text-[black] group-hover:w-[24px] group-hover:h-[24px] group-hover:text-[#4A169B]'/>
      </motion.a>

      <motion.a
      href='' 
      whileHover={{
        x: [0, -4, 4, -4, 4, 0],
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className='w-[21.98px] h-[21.98px] md:w-[30px] md:h-[30px] lg:w-[21.98px] lg:h-[21.98px] bg-white rounded-full flex items-center justify-center hover:w-[40px] hover:h-[40px] group transition-transform duration-500 ease-in-out'><FaTiktok className='text-center w-[13.19px] h-[13.9px] md:w-[18px] md:h-[18px] lg:w-[13.19px] lg:h-[13.9px] text-[black] group-hover:w-[24px] group-hover:h-[24px] group-hover:text-[#4A169B]'/>
      </motion.a>

      <motion.a
      href='' 
      whileHover={{
        x: [0, -4, 4, -4, 4, 0],
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className='w-[21.98px] h-[21.98px] md:w-[30px] md:h-[30px] lg:w-[21.98px] lg:h-[21.98px] bg-white rounded-full flex items-center justify-center hover:w-[40px] hover:h-[40px] group transition-transform duration-500 ease-in-out'><FaSquareXTwitter className='text-center w-[13.19px] h-[13.9px] md:w-[18px] md:h-[18px] lg:w-[13.19px] lg:h-[13.9px] text-[black] group-hover:w-[24px] group-hover:h-[24px] group-hover:text-[#4A169B]'/>
      </motion.a>

      <motion.a
      href='' 
      whileHover={{
        x: [0, -4, 4, -4, 4, 0],
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className='w-[21.98px] h-[21.98px] md:w-[30px] md:h-[30px] lg:w-[21.98px] lg:h-[21.98px] bg-white rounded-full flex items-center justify-center hover:w-[40px] hover:h-[40px] group transition-transform duration-500 ease-in-out'><FaFacebook className='text-center w-[13.19px] h-[13.9px] md:w-[18px] md:h-[18px] lg:w-[13.19px] lg:h-[13.9px] text-[black] group-hover:w-[24px] group-hover:h-[24px] group-hover:text-[#4A169B]'/>
      </motion.a>

      <motion.a
      href='' 
      whileHover={{
        x: [0, -4, 4, -4, 4, 0],
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className='w-[21.98px] h-[21.98px] md:w-[30px] md:h-[30px] lg:w-[21.98px] lg:h-[21.98px] bg-white rounded-full flex items-center justify-center hover:w-[40px] hover:h-[40px] group transition-transform duration-500 ease-in-out'><FaYoutube className='text-center w-[13.19px] h-[13.9px] md:w-[18px] md:h-[18px] lg:w-[13.19px] lg:h-[13.9px] text-[black] group-hover:w-[24px] group-hover:h-[24px] group-hover:text-[#4A169B]'/>
      </motion.a>
    </div>
  )
}

export default Footer
