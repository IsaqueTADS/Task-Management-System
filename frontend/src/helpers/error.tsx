import React from "react";

const Error = ({ children }: React.PropsWithChildren) => {
  return <p className="text-red-600">{children}</p>;
};

export default Error;
