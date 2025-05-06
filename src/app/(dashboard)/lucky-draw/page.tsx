import React from "react";

const LuckyDrawPage = () => {
  return (
    <section className="w-full h-full flex flex-col space-y-5">
      {Array.from({ length: 50 }, (_, index) => (
        <p
          key={index}
          className="text-bgtext-100 font-inter text-2xl font-semibold"
        >
          Hello world
        </p>
      ))}
    </section>
  );
};

export default LuckyDrawPage;
