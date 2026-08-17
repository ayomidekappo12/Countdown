"use client";
import React from "react";
import Image from "next/image";
import { Mail, Menu } from "lucide-react";
import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full h-auto flex flex-row justify-between items-center pr-[30px] lg:pr-[64px] lg:pl-[31px] py-[8px]">
      <div className="w-fit h-auto">
        <Image
          src={"/images/whitelog.png"}
          alt="Logo"
          width={226}
          height={60}
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
        className={`fixed top-0 left-0 w-full h-[35vh] md:h-[22vh] bg-white text-white items-center flex justify-between z-30 md:flex lg:hidden flex-col gap-6 transition-transform duration-500 rounded-b-[16px]   ease-in-out ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="py-[24px]">
          <Image
            src="/images/purplelogo.png"
            alt="logo2"
            width={152}
            height={40}
          />
        </div>

        <div className=" w-full flex flex-col gap-4 px-[36px] pb-4">
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
};

export default Header;
