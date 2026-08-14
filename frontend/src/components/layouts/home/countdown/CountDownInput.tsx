import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FieldValues, UseFormRegister, Path } from "react-hook-form";

// 👇 Change: 'id: Path<T>' instead of 'keyof T'
type InputFieldProps<T extends FieldValues> = {
  id: Path<T>;
  type: string;
  placeholder: string;
  autoComplete: string;
  error?: string;
  register: UseFormRegister<T>;
  className?: string;
};

const InputField = <T extends FieldValues>({
  id,
  type,
  placeholder,
  autoComplete,
  error,
  register,
  className = "",
}: InputFieldProps<T>) => (
  <div className="flex flex-col w-full">
    <label htmlFor={String(id)} className="sr-only">
      {placeholder}
    </label>
    <Input
      id={String(id)}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={!!error}
      className={cn(className, error && "ring-1 ring-red-500")}
      {...register(id)}
    />
    {error && (
      <span
        className="text-red-500 text-xs px-2 py-1 font-semibold"
        role="alert"
      >
        {error}
      </span>
    )}
  </div>
);

type SubmitButtonProps = {
  loading: boolean;
  isSubmitting: boolean;
  className?: string;
};

export const SubmitButton = ({
  loading,
  isSubmitting,
  className = "",
}: SubmitButtonProps) => (
  <Button
    type="submit"
    aria-busy={loading || isSubmitting}
    disabled={loading || isSubmitting}
    className={cn(
      "rounded-lg bg-[#4a169b] hover:bg-[#502F9D] font-semibold text-white",
      className
    )}
  >
    {loading ? "Loading..." : "Join the waitlist"}
  </Button>
);

export { InputField };
