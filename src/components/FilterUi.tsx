import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { getUniqueDomain, getUniqueGender } from "../redux-store/dataSlice";

export default function FilterUi() {
  const dispatch = useDispatch();

  return (
    <div>
      <select
        name="domain changer"
        id=""
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
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
        id=""
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
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
    </div>
  );
}
