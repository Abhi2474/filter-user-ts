import React from "react";

type ButtonProps = {
  children?: React.ReactNode;
  isDisable?: boolean;
  onClick?: () => { payload: undefined; type: string };
};

export default function Button({ children, isDisable, onClick }: ButtonProps) {
  return (
    <button
      disabled={isDisable}
      onClick={onClick}
      className={`py-2 px-4 font-bold rounded-sm text-white ${
        isDisable
          ? "cursor-not-allowed bg-gray-500"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {children}
    </button>
  );
}
