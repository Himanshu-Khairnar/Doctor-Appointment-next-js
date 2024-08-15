"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/Patient";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dataFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  dateFormat?: string;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;
  const [number, setNumber] = useState<string | undefined>(field.value);
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 w-full">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "Icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            value={number}
            onChange={(value) => {
              setNumber(value);
              field.onChange(value); // Update react-hook-form value
            }}
            placeholder={placeholder}
            international
            className="input-phone w-full"
          />
        </FormControl>
      );
      break;
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 p-2 ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 10.2H4M15.5556 3V6.6M8.44444 3V6.6M8.26667 21H15.7333C17.2268 21 17.9735 21 18.544 20.7057C19.0457 20.4469 19.4537 20.0338 19.7094 19.5258C20 18.9482 20 18.1921 20 16.68V9.12C20 7.60786 20 6.85179 19.7094 6.27423C19.4537 5.76619 19.0457 5.35314 18.544 5.09428C17.9735 4.8 17.2268 4.8 15.7333 4.8H8.26667C6.77319 4.8 6.02646 4.8 5.45603 5.09428C4.95426 5.35314 4.54631 5.76619 4.29065 6.27423C4 6.85179 4 7.60786 4 9.12V16.68C4 18.1921 4 18.9482 4.29065 19.5258C4.54631 20.0338 4.95426 20.4469 5.45603 20.7057C6.02646 21 6.77319 21 8.26667 21Z"
              stroke="#CDE9DF"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
              }}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time"
              wrapperClassName="data-picker"
            />
          </FormControl>
        </div>
      );
      break;
    case FormFieldType.SELECTINPUT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
      break;
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
      break;
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">{props.label}</label>
          </div>
        </FormControl>
      );
  }
};
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
