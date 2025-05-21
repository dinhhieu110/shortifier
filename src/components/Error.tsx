import type { FC } from "react";

const Error: FC<{ message: string }> = ({ message }) => {
  return <span className="text-sm text-red-400 italic">{message}</span>;
};

export default Error;
