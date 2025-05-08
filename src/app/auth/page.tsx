import BlueShadowIcon from "@/components/icons/blue-shadow";
import React from "react";
import { LoginCardForm } from "./_components/login-card";

const AuthPage = () => {
  return (
    <section
      className={
        "flex w-full h-screen rounded-xl bg-gradient-to-t from-linblue-start to-black"
      }
    >
      <div className="flex items-center justify-center w-full h-full bg-[url(/assets/images/checkboard-transparent.png)] bg-no-repeat bg-bottom bg-cover rounded-xl">
        <LoginCardForm />
      </div>
      <BlueShadowIcon className="absolute h-full z-10 inset-0 mask-t-from-10%" />
    </section>
  );
};

export default AuthPage;
