import React from "react";
import ItemPerks from "./_components/item";

const PerksPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Available Perks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
        {Array.from({ length: 8 }, (_, index) => (
          <ItemPerks key={index} />
        ))}
      </div>
    </section>
  );
};

export default PerksPage;
