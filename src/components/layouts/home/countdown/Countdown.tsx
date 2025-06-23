"use client";

import instance from "@/api/axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Footer from "./footer";
import Header from "./header";
import { cn } from "@/lib/utils";


// --- Schema for Subscribe Form ---
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

// --- Subscription Form Component ---
function SubscribeForm() {
  const [loading, setLoading] = useState(false);

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
      console.log("Form submitted:", data);
      const { firstName, email } = data;
      const response = await instance.post("/subscribe", {
      name: firstName,
      email,
    });
       console.log("Server response:", response.data);

      toast("Thanks for subscribing! You’ll be notified when we launch.", {
        description: new Date().toLocaleString(),
        icon: "✅",
      });

      form.reset();
    } catch (error: any) {
        console.error("Submission error", error);

  const backendMessage =
    error?.response?.data?.message || "Something went wrong. Please try again later.";

  toast(backendMessage, {
    description: new Date().toLocaleString(),
    icon: "❌",
  });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Subscribe to updates">
        <fieldset className="flex w-auto max-h-20 overflow-hidden rounded-md items-center justify-center shadow-md bg-white gap-48 py-2 pl-4 pr-1 opacity-100 mt-14">
          <legend className="sr-only">Subscribe Form</legend>
          <div className="flex flex-1 gap-8 divide-x divide-gray-300">
            <div className="flex flex-col flex-1 pr-4">
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="First Name"
                autoComplete="given-name"
                aria-invalid={!!errors.firstName}
                className={cn(
                  "rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg text-black font-medium",
                  errors.firstName && "ring-1 ring-red-500"
                )}
                {...register("firstName")}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs px-4 py-1" role="alert">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className={cn(
                  "rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg text-black font-medium",
                  errors.email && "ring-1 ring-red-500"
                )}
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-xs px-4 py-1" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            aria-busy={loading || isSubmitting}
            className="hidden lg:flex rounded-lg bg-[#4a169b] hover:bg-[#502F9D] font-semibold text-lg text-white px-5 py-5 cursor-pointer"
            disabled={loading || isSubmitting}
          >
            {loading ? "Loading..." : "Join the waitlist"}
          </Button>
        </fieldset>
        <Button
          type="submit"
          aria-busy={loading || isSubmitting}
          className="flex lg:hidden rounded-lg bg-[#4a169b] hover:bg-[#502F9D] font-semibold text-xl text-white px-72 py-6 cursor-pointer items-center justify-center mt-4"
          disabled={loading || isSubmitting}
        >
          {loading ? "Loading..." : "Join the waitlist"}
        </Button>
      </form>
    </Form>
  );
}

// ---  Main Countdown Component ---
const CountDownComponent = () => {
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
    "Web Development",
    "Mobile App Development",
    "User Experience Design",
    "Market Research",
    "Custom Software Development",
    "IT Consulting",
  ];

  return (
    <>
      <Header />
      <div className="flex flex-col w-auto items-center justify-center rounded-[30px] sm:px-8 text-white py-8 sm:mx-6 mt-4 mb-6">
        {/* Countdown Display */}
        <div className="flex sm:flex-nowrap gap-2 sm:gap-4 lg:gap-10 max-w-2xl max-h-28 justify-center items-center bg">
          {isLive ? (
            <div className="text-3xl md:text-5xl font-bold text-[#f1b841]">
              🎉 We’re Live!
            </div>
          ) : (
            countdownItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-20 h-16 sm:w-32 sm:h-28 bg-white text-black rounded-md items-center sm:gap-3"
              >
                <h1 className="text-3xl max-w-20 max-h-16 md:text-5xl font-bold sm:pt-2">
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
        <div className="flex flex-col items-center justify-center text-center max-w-6xl mt-10">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold pt-1">
            We are <span className="text-[#f1b841]">launching</span> soon!
          </h1>
          <p className="mt-5 text-lg md:text-xl lg:text-2xl font-light">
            We're almost there! Want to be the first to know when we launch?
            Subscribe to our mailing list.
          </p>
        </div>

        {/* Services */}
        <div className="mt-10">
          <ol className="grid grid-cols-2 md:grid-flow-col md:grid-rows-2 gap-x-8 gap-y-4 list-none px-2">
            {services.map((service, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-xs md:text-sm lg:text-base font-extralight leading-relaxed"
              >
                <img
                  src="/images/material-symbols_star.png"
                  alt="Star"
                  className="mt-0.5 w-5 h-5 shrink-0"
                  aria-hidden="true"
                />
                <span>{service}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Subscription Form */}
        <div className="flex flex-col gap-20 mt-8">
          <SubscribeForm />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CountDownComponent;
