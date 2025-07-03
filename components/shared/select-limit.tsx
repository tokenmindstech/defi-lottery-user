"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PAGINATION_ITEMS } from "../../constant/common";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "../../lib/utils";

const SelectLimit = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current limit from URL or default to "10"
  const activeLimit =
    searchParams.get("limit") &&
    !Number.isNaN(parseInt(searchParams.get("limit") as string))
      ? (searchParams.get("limit") as string)
      : "10";

  const handleLimitChange = (limit: string) => {
    const updatedParams = searchParams.toString();

    const newUrl = formUrlQuery({
      params: updatedParams.replace("/?", ""),
      key: "limit",
      value: limit,
    });

    router.push(decodeURIComponent(newUrl), { scroll: false });
  };

  return (
    <Select defaultValue={activeLimit} onValueChange={handleLimitChange}>
      <SelectTrigger className="data-[size=default]:h-10 bg-bgtext-950 rounded-xl text-bgtext-100 border-2 border-bgtext-800">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent className="bg-bgtext-900 border-bgtext-800">
        {PAGINATION_ITEMS.map((item, idx) => (
          <SelectItem
            key={idx}
            value={item.toString()}
            className="text-bgtext-100"
          >
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectLimit;
