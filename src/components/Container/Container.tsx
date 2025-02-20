import React, { ReactElement } from "react";

interface Container {
  children: any;
}

const Container = ({ children }: Container) => {
  return <div className="lg:container mx-auto p-6 flex flex-col items-center">{children}</div>;
};

export default Container;
