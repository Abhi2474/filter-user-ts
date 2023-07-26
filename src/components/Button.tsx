import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseCurrentPage,
  increaseCurrentPage,
} from "../redux-store/dataSlice";

type ButtonProps = {
  children: React.ReactNode;
  isDisable: boolean;
  isNext: boolean;
};

export default function Button({ children, isDisable, isNext }: ButtonProps) {
  const dispatch = useDispatch();
  return (
    <button
      disabled={isDisable}
      onClick={() =>
        isNext
          ? dispatch(increaseCurrentPage())
          : dispatch(decreaseCurrentPage())
      }
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
