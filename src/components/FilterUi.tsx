import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvailableUser,
  getUniqueDomain,
  getUniqueGender,
  isAvailable,
  resetUser,
  setDomain,
  setGender,
} from "../redux-store/dataSlice";
import type { RootState } from "../redux-store/store";
import { GrPowerReset } from "react-icons/gr";

export default function FilterUi() {
  const userFilterBy = useSelector((state: RootState) => state.users.filterBy);
  const userPagination = useSelector((state: RootState) => state.users.meta);
  const dispatch = useDispatch();

  return (
    <div>
      <select
        name="domain changer"
        value={userFilterBy.domain}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          dispatch(setDomain(e.target.value));
          dispatch(getUniqueDomain(e.target.value));
        }}
      >
        <option value="">--select Domain--</option>
        <option value="Sales">Sales</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="IT">IT</option>
        <option value="Management">Management</option>
        <option value="UI Designing">UI Designing</option>
        <option value="Business Development">Business Development</option>
      </select>
      <select
        name="gender changer"
        value={userFilterBy.gender}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          console.log(e.target.value);
          dispatch(setGender(e.target.value));
          dispatch(getUniqueGender(e.target.value));
        }}
      >
        <option value="">--select Domain--</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Agender">Agender</option>
        <option value="Bigender">Bigender</option>
        <option value="Polygender">Polygender</option>
        <option value="Non-binary">Non-binary</option>
        <option value="Genderfluid">Genderfluid</option>
        <option value="Genderqueer">Genderqueer</option>
      </select>

      <label>
        <input
          type="checkbox"
          name=""
          checked={userFilterBy.available}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch(isAvailable(e.target.checked));
            dispatch(getAvailableUser(e.target.checked));
          }}
        />
        Available
      </label>
      <span className="mx-10">
        Page <b>{userPagination.currentPage}</b>/
        <b>{userPagination.totalPages}</b> and{" "}
        <b>{userPagination.totalItems}</b> Total Items
      </span>
      <button onClick={() => dispatch(resetUser())}>
        <GrPowerReset /> reset
      </button>
    </div>
  );
}
