import React from "react";

interface ContainerInterface {
  children: React.ReactNode;
}

const Container: React.FC<ContainerInterface> = ({ children }) => {
  return <div className="lg:container mx-auto p-6 flex flex-col items-center">{children}</div>;
};

export default Container;
