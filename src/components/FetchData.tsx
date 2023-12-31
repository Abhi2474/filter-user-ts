import { useEffect } from "react";
import { DataProps } from "../type";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux-store/store";
import {
  decreaseCurrentPage,
  increaseCurrentPage,
  setUser,
} from "../redux-store/dataSlice";
import Button from "./Button";

export default function FetchData() {
  const usersPagination = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
  }, []);

  return (
    <div className="mb-20">
      <div className="grid grid-cols-3 gap-10 p-4 place-items-center">
        {usersPagination?.data.map((user) => {
          return <FetchDataTemplate key={user.id} user={user} />;
        })}
      </div>
      <div className="flex justify-between container mx-auto px-10 my-5">
        <Button
          isDisable={usersPagination?.meta.currentPage <= 1}
          onClick={() => dispatch(decreaseCurrentPage())}
        >
          Previous
        </Button>
        <Button
          isDisable={
            usersPagination?.meta.currentPage > usersPagination.meta.totalPages
          }
          onClick={() => dispatch(increaseCurrentPage())}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const FetchDataTemplate: React.FC<{ user: DataProps }> = ({ user }) => {
  return (
    <div className="bg-gray-200 rounded-sm p-4 flex flex-grow w-4/5 flex-col items-center">
      <img
        className={`border-2 rounded-full ${
          user.available ? "border-green-500" : "border-red-500"
        }`}
        src={user.avatar}
        alt={user.first_name}
      />
      <ul className=" w-full mt-4 p-2">
        <li>
          Id: <b>{user.id}</b>
        </li>
        <li>
          Name: <b>{user.first_name + " " + user.last_name}</b>
        </li>
        <li>
          Email: <b>{user.email}</b>
        </li>
        <li>
          Gender: <b>{user.gender}</b>
        </li>
        <li>
          Domain: <b> {user.domain}</b>
        </li>
      </ul>
    </div>
  );
};
