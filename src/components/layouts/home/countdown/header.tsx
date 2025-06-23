'use client'
import React, { use } from 'react'
import Image from 'next/image'
import { Mail, Menu  } from 'lucide-react';
import { useState } from 'react';
import PrimaryButton from '@/components/PrimaryButton';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="w-full h-auto flex justify-between items-center pr-[30px] lg:pr-[64px] lg:pl-[31px]">
      <div className="w-[244.46px] h-[86px] md:w-[245px] md:h-[86.5px] lg:w-[348px] lg:h-[122px]">
        <Image
          src={"/images/whitelog.png"}
          alt="Logo"
          className=""
          width={50}
          height={50}
        />
      </div>

      <div className="hidden md:hidden lg:flex flex-row gap-x-[4px] items-center justify-start">
        <Mail className="w-[24px] h-[24px] text-white" />
        <a
          href="mailto:synara.dev@gmail.com"
          className="text-white text-[16px] font-light"
        >
          synara.dev@gmail.com
        </a>
      </div>

      <div className="flex md:flex lg:hidden">
        <Menu
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-[32px] h-[32px] md:w-[48px] md:h-[48px] text-white"
        />
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-[50vh] bg-white text-white items-center flex justify-between z-30 md:flex lg:hidden flex-col gap-6 transition-transform duration-500 rounded-b-[16px]   ease-in-out ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="py-[24px]">
          <Image
            src="/images/purplelogo.png"
            alt="logo2"
            width={100}
            height={100}
          />
        </div>

        <div className=" w-full flex flex-col gap-4 px-[36px] py-[50px]">
          <PrimaryButton
            text="Contact Us"
            className="bg-black text-white hover:scale-95 transition-transform duration-500 ease-in-out cursor-pointer font-normal rounded-[8px]  text-[16px] flex items-center justify-center w-full"
          />

          <PrimaryButton
            text="Close"
            className="bg-white text-black cursor-pointer font-normal rounded-[8px] text-[16px] flex items-center justify-center hover:scale-95 transition-transform duration-500 ease-in-out border-[1px] border-black w-full"
            action={() => setMenuOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Header
