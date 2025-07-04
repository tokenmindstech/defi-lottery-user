import React from "react";
import ItemPerks from "./_components/item";
import WinnerBanner from "./_components/winner-banner";

const PerksPage = () => {
  return (
    <section className="flex flex-col w-full h-full space-y-10">
      <h2 className="text-3xl font-medium text-bgtext-100 font-inter whitespace-nowrap">
        Lucky Draw
      </h2>

      <WinnerBanner
        perks={{
          id: "1",
          imageUrl: "/assets/images/iphone.png",
          name: "iPhone 14 Pro Max",
          description: "Win an iPhone 14 Pro Max",
          category: ["electronics", "mobile"],
          numberOfWinners: 1,
          createdAt: new Date().toISOString(),
          validAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          perkWinners: [
            {
              id: "1",
              name: "John Doe",
            },
            {
              id: "2",
              name: "Jane Smith",
            },
            {
              id: "3",
              name: "Alice Johnson",
            },
          ],
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
        {Array.from({ length: 8 }, (_, index) => (
          <ItemPerks key={index} />
        ))}
      </div>
    </section>
  );
};

export default PerksPage;
