"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTransition } from "react";

interface SelectFilterProps {
  paramName: string;
  placheholder?: string;
  defaultValue?:string;
  options: { label: string; value: string }[];
}

function SelectFilter({
  paramName,
  placheholder,
  defaultValue  = "All",
  options,
}: SelectFilterProps) {
  const router = useRouter();
  const searchparams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentValue = searchparams.get(paramName) || defaultValue;
  console.log({currentValue});
  

  const handleChange = (value: string) => {
    console.log({ value });

    const params = new URLSearchParams(searchparams.toString());

    if (value === defaultValue) {
      params.delete(paramName);
    } else if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    console.log({ "searchparams.toString()": params.toString() });

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <Select
      value={currentValue}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger>
        <SelectValue placeholder={placheholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={defaultValue}>{defaultValue}</SelectItem>
        {options?.map((option) => (
          <SelectItem key={option?.value} value={option?.label}>
            {option?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectFilter;
