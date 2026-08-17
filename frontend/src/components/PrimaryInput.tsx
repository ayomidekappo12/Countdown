import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export interface PrimaryInputProps {
  fieldName?: string;
  onChange?: (value: string) => void;
  value?: string;
  type: string;
  className?: string;
  placeholder?: string;
  title?: string;
  id: string;
  min?: number;
  max?: number;
  maxLength?: number;
  help?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  autocomplete?: "on" | "off";
}

const PrimaryInput = ({
  fieldName,
  type,
  onChange,
  value,
  className,
  placeholder,
  title,
  id,
  min,
  max,
  maxLength,
  help,
  defaultValue,
  disabled,
  autocomplete = "on",
}: PrimaryInputProps) => {
  return (
    <div className={cn("max-w-screen-sm", className)}>
      <label htmlFor={id} className="text-[13px] font-medium text-gray-600">
        {title}
      </label>
      <Input
        name={fieldName}
        disabled={disabled}
        id={id}
        type={type}
        min={min}
        max={max}
        maxLength={maxLength}
        className="h-10 rounded-[10px] focus:outline-none focus-visible:ring-transparent block text-sm placeholder:text-slate-300 my-2 "
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autocomplete}
      />
      {help && (
        <p className="text-[12px] flex pt-1 pl-3.5 font-regular text-grayAsh">
          {help}
        </p>
      )}
    </div>
  );
};

export default PrimaryInput;
