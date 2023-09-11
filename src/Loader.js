import React from "react";

const Loader = () => {
  return (
    <div className="bg-blur-loader fixed h-screen flex w-full items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-t-red-800 animate-spin" />
    </div>
  );
};

export default Loader;
