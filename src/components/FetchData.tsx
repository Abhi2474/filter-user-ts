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

  console.log(usersPagination);

  return (
    <div className="mb-20">
      <div className="grid grid-cols-3 gap-10 p-4">
        {usersPagination?.data.map((user) => {
          return <FetchDataTemplate key={user.id} user={user} />;
        })}
      </div>
      <div className="flex justify-between px-10">
        <Button
          isDisable={usersPagination?.meta.currentPage <= 1}
          isNext={false}
        >
          Previous
        </Button>
        <Button
          isDisable={
            usersPagination?.meta.currentPage >= usersPagination.meta.totalPages
          }
          isNext={true}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

const FetchDataTemplate: React.FC<{ user: DataProps }> = ({ user }) => {
  return (
    <div className="bg-gray-200 rounded-sm p-4 flex flex-col items-center">
      <img
        className={`border-2 rounded-full ${
          user.available ? "border-green-500" : "border-red-500"
        }`}
        src={user.avatar}
        alt={user.first_name}
      />
      <ul className="bg-white w-full mt-4 p-2">
        <li>Id: {user.id}</li>
        <li>Name: {user.first_name + " " + user.last_name}</li>
        <li>Email: {user.email}</li>
        <li>Gender: {user.gender}</li>
        <li>Domain: {user.domain}</li>
      </ul>
    </div>
  );
};
