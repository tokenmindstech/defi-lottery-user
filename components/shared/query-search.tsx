import { Input } from "../ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import { formUrlQuery, removeKeysFromQuery } from "../../lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import SelectLimit from "./select-limit";

interface QuerySearchProps {
  page: number;
}

const QuerySearch = ({ page }: QuerySearchProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = useDebounceCallback(
    (query: string) => {
      let newUrl = "";

      if (query.trim() === "") {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });

        router.push(newUrl, { scroll: false });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: query,
        });

        router.push(decodeURIComponent(newUrl), { scroll: false });
      }

      if (page !== 1) {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["page"],
        });
        router.push(decodeURIComponent(newUrl), { scroll: false });
      } else {
        router.push(newUrl, { scroll: false });
      }
    },
    500 // Debounce delay in milliseconds
  );
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="relative w-72">
        <Input
          placeholder="Search..."
          type="text"
          inputMode="text"
          defaultValue={searchParams.get("q") || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full h-10 bg-bgtext-900 border-1 border-bgtext-800 rounded-full text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
          StartIcon={MagnifyingGlass}
        />
      </div>
      <SelectLimit />
    </div>
  );
};

export default QuerySearch;
