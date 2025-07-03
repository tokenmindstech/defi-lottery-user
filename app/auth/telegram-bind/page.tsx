import React from "react";
import BindTelegramForm from "./_components/bind-telegram-form";
import BlueShadowBottom from "@/components/icons/blue-shadow-bottom";

const BindTelegramPage = () => {
  return (
    <section
      className={
        "flex w-full h-screen rounded-xl bg-gradient-to-t from-linblue-start to-black"
      }
    >
      <div className="flex items-center justify-center w-full h-full bg-[url(/assets/images/checkboard-transparent.png)] bg-no-repeat bg-bottom bg-cover rounded-xl">
        <BindTelegramForm />
      </div>
      <BlueShadowBottom className="absolute h-full z-10 inset-0 mask-t-from-10%" />
    </section>
  );
};

export default BindTelegramPage;
