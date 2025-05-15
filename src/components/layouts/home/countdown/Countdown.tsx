"use client";

import React, { useState } from "react";
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast("Thanks for subscribing! You’ll be notified when we launch.", {
        description: new Date().toLocaleString(),
        icon: "✅",
      });

      form.reset();
    } catch (error) {
      console.error("Submission error", error);
      toast("Something went wrong. Please try again later.", {
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
        <fieldset className="flex max-w-7xl max-h-20 overflow-hidden rounded-md items-center justify-center shadow-md bg-white gap-48 py-2 pl-4 pr-1 opacity-100 mt-24">
          <legend className="sr-only">Subscribe Form</legend>
          <div className="flex flex-1 max-w-2xl max-h-20 gap-8 divide-x divide-gray-300">
            <div className="flex flex-col flex-1 w-64 pr-4">
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
                  "rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium",
                  errors.firstName && "ring-1 ring-red-500"
                )}
                {...register("firstName")}
              />
              {errors.firstName && (
                <span
                  className="text-red-500 text-xs px-4 py-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col flex-1 w-80">
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
                  "rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg font-medium",
                  errors.email && "ring-1 ring-red-500"
                )}
                {...register("email")}
              />
              {errors.email && (
                <span
                  className="text-red-500 text-xs px-4 py-1"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            aria-busy={loading || isSubmitting}
            className="max-w-38 max-h-16 rounded-lg bg-[#4a169b] hover:bg-[#502F9D] font-semibold text-lg text-white px-5 py-5 cursor-pointer"
            disabled={loading || isSubmitting}
          >
            {loading ? "Loading..." : "Subscribe"}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}

// Main countdown component
const CountDownComponent = () => {
  const countdownItems = [
    { label: "Days", value: "60" },
    { label: "Hours", value: "04" },
    { label: "Minutes", value: "43" },
    { label: "Seconds", value: "23" },
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
      {/* Header */}
      <Header />
      <div className="flex flex-col w-full items-center justify-center px-4 text-white">
        {/* Countdown */}
        <div className="flex flex-wrap md:flex-nowrap gap-10 max-w-2xl max-h-28 justify-center items-center">
          {countdownItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-28 h-24 md:w-32 md:h-28 bg-white text-black rounded-md justify-center items-center gap-2"
            >
              <h1 className="text-3xl max-w-20 max-h-16 md:text-5xl font-bold">
                {item.value}
              </h1>
              <span className="text-lg md:text-2xl font-light">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Launch Message */}
        <div className="flex flex-col items-center justify-center text-center max-w-6xl mt-5">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold pt-1">
            We are <span className="text-yellow-400">launching</span> soon!
          </h1>
          <p className="mt-5 text-lg md:text-xl lg:text-2xl font-light">
            We're almost there! Want to be the first to know when we launch?
            Subscribe to our mailing list.
          </p>
        </div>

        {/* Services List */}
        <div className="mt-8 max-w-4xl">
          <ol className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 list-none px-2">
            {services.map((service, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-xs md:text-sm lg:text-base font-extralight leading-relaxed"
              >
                <img
                  src="/images/material-symbols_star.png"
                  alt="Decorative star icon"
                  className="mt-0.5 w-5 h-5 shrink-0"
                  aria-hidden="true"
                />

                <span>{service}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Subscription Form */}
        <SubscribeForm />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default CountDownComponent;
