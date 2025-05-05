import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-bgtext-950">
      <h1 className="text-4xl font-bold text-bgtext-100">404 - Not Found</h1>
      <p className="mt-4 text-lg text-bgtext-300">
        The page you are looking for does not exist.
      </p>
      <p className="mt-2 text-lg text-bgtext-300">
        Please check the URL or return to the homepage.
      </p>
    </div>
  );
};

export default NotFoundPage;
