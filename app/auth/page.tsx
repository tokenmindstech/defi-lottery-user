import React from "react";
import LoginForm from "./_components/login-form";
import BlueShadowBottom from "@/components/icons/blue-shadow-bottom";

const AuthPage = () => {
  return (
    <section
      className={
        "flex w-full h-screen rounded-xl bg-gradient-to-t from-linblue-start to-black"
      }
    >
      <div className="flex items-center justify-center w-full h-full bg-[url(/assets/images/checkboard-transparent.png)] bg-no-repeat bg-bottom bg-cover rounded-xl">
        <LoginForm />
      </div>
      <BlueShadowBottom className="absolute h-full z-10 inset-0 mask-t-from-10%" />
    </section>
  );
};

export default AuthPage;
