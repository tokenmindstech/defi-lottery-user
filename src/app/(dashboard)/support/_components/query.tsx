import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import React from "react";
import SelectLimitSupport from "./support-select-limit";

const QuerySupport = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="relative w-72">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full h-10 bg-bgtext-900 border-1 border-bgtext-800 rounded-full text-bgtext-100 selection:bg-bgtext-100 selection:text-bgtext-900 focus-visible:ring-0 focus-visible:border-[1px] focus-visible:border-bgtext-100 focus-visible:ring-bgtext-100"
          StartIcon={MagnifyingGlass}
        />
      </div>
      <SelectLimitSupport />
    </div>
  );
};

export default QuerySupport;
