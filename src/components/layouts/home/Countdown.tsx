"use client";

import Link from "next/link";


const CountDownComponent = () => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  return (
    <div className="flex flex-col lg:flex-row w-full space-y-20 lg:space-y-0 space-x-0 lg:space-x-8 px-10 md:px-32 xl:px-28 max-w-screen-2xl py-14 md:py-28 lg:py-36 bg-transparent justify-center">
      <div className="flex flex-col w-full lg:w-1/2 text-start">
        <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight md:leading-snug lg:leading-tight font-mono">
          Technical assessments
          <br className="block md:hidden" /> for employers and techies
        </p>

        <p className="text-sm text-gray-800 md:text-lg font-normal pt-4">
          We provide hands-on technical assessments for{" "}
          <span className="text-primary">developers</span>,{" "}
          <span className="text-primary">designers</span> and other{" "}
          <span className="text-primary">tech professionals</span>.
        </p>
      </div>
      <div className="flex w-full lg:w-1/2 rounded-lg justify-start md:justify-center">
        <Link href={`${domain}/start`}>
          <img
            className="w-full cursor-pointer"
            src="https://res.cloudinary.com/jsonkile/image/upload/v1740616091/workunlock_assets/khisim3pmgs18rldyxsr.png"
          />
        </Link>
      </div>
    </div>
  );
};

export default CountDownComponent;
