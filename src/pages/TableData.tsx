import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux-store/store";
import { DataProps } from "../type";
import Button from "../components/Button";
import { resetUser, setUser } from "../redux-store/dataSlice";

export default function TableData() {
  const usersPagination = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
  }, []);

  return (
    <>
      <button onClick={() => dispatch(resetUser())}>reset</button>
      <table className="container table-auto mx-auto text-center border-separate border-spacing-y-2 ">
        <caption className="caption-top my-4">
          Table: Users and their details.
        </caption>
        <thead className="bg-gray-200 uppercase">
          <tr>
            <th>id</th>
            <th>avatar</th>
            <th>name</th>
            <th>email</th>
            <th>gender</th>
            <th>domain</th>
          </tr>
        </thead>
        <tbody>
          {usersPagination?.data.map((user) => {
            return <FetchTableData key={user.id} user={user} />;
          })}
        </tbody>
      </table>
      <div className="flex justify-between container mx-auto px-10 my-5">
        <Button
          isDisable={usersPagination?.meta.currentPage <= 1}
          isNext={false}
        >
          Previous
        </Button>
        <Button
          isDisable={
            usersPagination?.meta.currentPage > usersPagination.meta.totalPages
          }
          isNext={true}
        >
          Next
        </Button>
      </div>
    </>
  );
}

const FetchTableData = ({ user }: { user: DataProps }) => {
  return (
    <tr className={`${user.id % 2 === 0 ? "bg-gray-100" : "bg-white"} `}>
      <td>{user.id}</td>
      <td>
        <img
          className={`border-2 rounded-full my-3 ${
            user.available ? "border-green-500" : "border-red-500"
          }`}
          src={user.avatar}
          alt={user.first_name}
        />
      </td>
      <td>{user.first_name + " " + user.last_name}</td>
      <td>{user.email}</td>
      <td>{user.gender}</td>
      <td>{user.domain}</td>
    </tr>
  );
};
