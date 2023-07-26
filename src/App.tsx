import { useState } from "react";
import FetchData from "./components/FetchData";
import TableData from "./pages/TableData";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import FilterUi from "./components/FilterUi";
import Button from "./components/Button";
import { useDispatch } from "react-redux";
import { getUniqueDomain } from "./redux-store/dataSlice";

function App() {
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Hello Typescript</h1>
      <FilterUi />
      <Button onClick={() => dispatch(getUniqueDomain())}>Filter Domain</Button>
      {isToggle ? (
        <>
          <span className="flex items-center justify-between w-fit gap-4">
            <BsToggleOff
              className="w-8 h-8 fill-gray-500 cursor-pointer transition-colors "
              onClick={() => setIsToggle(!isToggle)}
            />
            Template Mode
          </span>
          <FetchData />
        </>
      ) : (
        <>
          <span className="flex items-center justify-between w-fit gap-4">
            <BsToggleOn
              className="w-8 h-8 fill-blue-500 cursor-pointer transition-colors "
              onClick={() => setIsToggle(!isToggle)}
            />
            Table Mode
          </span>

          <TableData />
        </>
      )}
    </>
  );
}

export default App;
