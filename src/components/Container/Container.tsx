import React from "react";

interface Container {
  children: React.ReactNode;
}

const Container: React.FC<Container> = ({ children }) => {
  return (
    <div className="lg:container mx-auto p-6 flex flex-col items-center">
      {children}
    </div>
  );
};

export default Container;
