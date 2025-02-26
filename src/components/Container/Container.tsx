import React from "react";

interface IContainer {
  children: React.ReactNode;
}

const Container: React.FC<IContainer> = ({ children }) => {
  return (
    <div className="lg:container mx-auto p-6 flex flex-col items-center">
      {children}
    </div>
  );
};

export default Container;
