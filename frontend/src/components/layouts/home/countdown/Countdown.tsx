"use client";

import instance from "@/api/axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import Footer from "./footer";
import Header from "./header";
const WaitlistModal = dynamic(() => import("./waitlist"), { ssr: false });

import { debugLog, debugError } from "@/lib/utils";
import {
  InputField,
  SubmitButton,
} from "@/components/layouts/home/countdown/CountDownInput";
import { useBreakpoint } from "@/lib/useBreakpoint";
import dynamic from "next/dynamic";

type SubscribeFormProps = {
  onSuccess?: () => void;
};

// --- Schema ---
const subscribeSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Please enter your first name" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]{1,50}(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]{1,50})*$/, {
      message: "Please enter a valid first name",
    }),
  email: z.string().email({ message: "Invalid email format" }),
});

type SubscribeFormData = z.infer<typeof subscribeSchema>;

// --- Component ---
function SubscribeForm({ onSuccess }: SubscribeFormProps) {
  const [loading, setLoading] = useState(false);
  const isDesktop = useBreakpoint("(min-width: 640px)");

  const form = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: SubscribeFormData) => {
    setLoading(true);
    try {
      debugLog("Form submitted:", data);
      const { firstName, email } = data;

      const response = await instance.post("/subscribe", {
        name: firstName,
        email,
      });

      debugLog("Server response:", response.data);

      toast("Thanks for subscribing! You’ll be notified when we launch.", {
        description: new Date().toLocaleString(),
        icon: "✅",
      });

      form.reset();
      if (onSuccess) onSuccess(); // trigger modal
    } catch (error: any) {
      debugError("Submission error", error);

      const backendMessage =
        error?.response?.data?.message ||
        "Something went wrong. Please try again later.";

      toast(backendMessage, {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-label="Subscribe to updates"
        className="w-full"
      >
        {isDesktop ? (
          // --- Desktop Layout ---
          <fieldset className="flex w-auto max-h-20 overflow-hidden rounded-md items-center justify-center shadow-md bg-white gap-48 py-2 sm:pl-4 sm:pr-1 opacity-100 mt-14">
            <legend className="sr-only">Subscribe Form</legend>
            <div className="flex flex-1 gap-8 divide-x divide-gray-300">
              <InputField<SubscribeFormData>
                id="firstName"
                type="text"
                placeholder="First Name"
                autoComplete="given-name"
                error={errors.firstName?.message}
                register={register}
                className="rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg text-black font-medium sm:pr-4"
              />
              <InputField<SubscribeFormData>
                id="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                error={errors.email?.message}
                register={register}
                className="rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg text-black font-medium sm:pl-4"
              />
            </div>
            <SubmitButton
              loading={loading}
              isSubmitting={isSubmitting}
              className="text-lg sm:px-5 py-5 cursor-pointer"
            />
          </fieldset>
        ) : (
          // --- Mobile Layout ---
          <div className="flex flex-col gap-3 px-2 mt-4">
            <div className="w-[330px] mx-auto flex flex-col gap-3">
              <InputField<SubscribeFormData>
                id="firstName"
                type="text"
                placeholder="First Name"
                autoComplete="given-name"
                error={errors.firstName?.message}
                register={register}
                className="w-full h-14 px-4 border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-black font-normal"
              />
              <InputField<SubscribeFormData>
                id="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                error={errors.email?.message}
                register={register}
                className="w-full h-14 px-4 border-none bg-white focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-black font-normal"
              />
              <SubmitButton
                loading={loading}
                isSubmitting={isSubmitting}
                className="w-full h-14 mt-1 text-base flex items-center justify-center"
              />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}

// ---  Main Countdown Component ---
const CountDownComponent = () => {
  const [showModal, setShowModal] = useState(false);
  // UTC-based countdown calculation
  const calculateTimeLeft = () => {
    const now = new Date();
    const nowUtc = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );

    const launchDate = new Date(Date.UTC(2025, 7, 15, 9, 30, 0));

    const diff = launchDate.getTime() - nowUtc.getTime();

    if (diff <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === "00" &&
        newTimeLeft.hours === "00" &&
        newTimeLeft.minutes === "00" &&
        newTimeLeft.seconds === "00"
      ) {
        setIsLive(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const services = [
    "Mobile App Development",
    "Web Development",
    "Market Research",
    "User Experience Design",
    "Custom Software Development",
    "IT Consulting",
  ];

  return (
    <>
      <Header />
      <WaitlistModal open={showModal} onOpenChange={setShowModal} />
      <div
        aria-live="polite"
        role="timer"
        className="flex flex-col flex-wrap w-auto items-center justify-center rounded-[30px] text-white py-8 mt-4 mb-6 sm:mx-6 appearance-none"
      >
        {/* Countdown Display */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 lg:gap-10 max-w-2xl max-h-28 justify-center items-center">
          {isLive ? (
            <div className="text-3xl md:text-5xl font-bold text-[#f1b841]">
              🎉 We’re Live!
            </div>
          ) : (
            countdownItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-[75px] h-20 sm:w-24 sm:h-24 md:w-[120px] md:h-[100px] bg-white text-black rounded-md items-center sm:gap-2 py-2"
              >
                <h1 className="text-3xl max-w-20 max-h-16 md:text-5xl font-bold">
                  {item.value}
                </h1>
                <span className="text-lg md:text-2xl font-light">
                  {item.label}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Launch Info */}
        <div className="flex flex-col items-center justify-center text-center mt-5 sm:mt-10">
          <h1 className="text-2xl font-extrabold sm:text-4xl sm:font-semibold md:text-6xl md:font-bold pt-1 text-center">
            We are launching soon!
          </h1>
          <p className="mt-5 px-6 sm:px-0 text-sm sm:text-base md:text-xl lg:text-2xl font-light text-pretty text-center wrap-anywhere">
            We're almost there! Want to be the first to know when we launch?
            Subscribe to our mailing list.
          </p>
        </div>

        {/* Services */}
        <div className="mt-10 items-center justify-center">
          <ol className="grid grid-cols-2 md:grid-flow-col md:grid-rows-2 gap-x-3 sm:gap-x-8 gap-y-4 list-none pl-8 sm:px-4">
            {services.map((service, index) => (
              <li
                key={index}
                className="flex space-x-1 text-xs md:text-sm lg:text-base font-extralight leading-relaxed"
              >
                <img
                  src="/images/material-symbols_star.png"
                  alt="Star"
                  className="mt-0 sm:mt-0.5 w-5 h-5 shrink-0"
                  aria-hidden="true"
                />
                <span>{service}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Subscription Form */}
        <div className="flex flex-col gap-20 mt-8">
          <SubscribeForm onSuccess={() => setShowModal(true)} />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CountDownComponent;
