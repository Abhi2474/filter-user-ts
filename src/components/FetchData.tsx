import { useEffect } from "react";
import { DataProps } from "../type";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux-store/store";
import {
  decreaseCurrentPage,
  increaseCurrentPage,
  setUser,
} from "../redux-store/dataSlice";

export default function FetchData() {
  const usersPagination = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
  }, []);

  console.log(usersPagination);

  return (
    <div>
      {usersPagination?.data.map((user) => {
        return <FetchDataTemplate key={user.id} user={user} />;
      })}
      <button
        disabled={
          usersPagination?.meta.currentPage >= usersPagination.meta.totalPages
        }
        onClick={() => {
          dispatch(increaseCurrentPage());
        }}
      >
        Increase page {usersPagination?.meta.currentPage}
      </button>
      <button
        disabled={usersPagination?.meta.currentPage <= 1}
        onClick={() => {
          dispatch(decreaseCurrentPage());
        }}
      >
        Decrease page {usersPagination?.meta.currentPage}
      </button>
    </div>
  );
}

const FetchDataTemplate: React.FC<{ user: DataProps }> = ({ user }) => {
  return <div>{user.id}</div>;
};
