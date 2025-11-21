import React from "react";

const Error = ({ children }: React.PropsWithChildren) => {
    return <span className="text-red-600 break-all">{children}</span>;
};

export default Error;
