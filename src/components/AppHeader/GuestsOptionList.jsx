import { useRef } from "react";
import OptionItem from "./OptionItem";
import useOutsideClick from "../../hooks/useOutsideClick";

function GuestsOptionList({ handleOption, option, setOpenOption }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "guestId", () => setOpenOption(false));

  return (
    <div
      ref={optionRef}
      className="absolute top-9 w-60 py-5 px-6 bg-white rounded-2xl shadow flex flex-col gap-y-3"
      onClick={(e) => e.stopPropagation()}
    >
      <OptionItem
        type="adult"
        minLimit={1}
        handleOption={handleOption}
        option={option}
      />
      <OptionItem
        type="children"
        minLimit={0}
        option={option}
        handleOption={handleOption}
      />
      <OptionItem
        type="rooms"
        minLimit={1}
        option={option}
        handleOption={handleOption}
      />
    </div>
  );
}

export default GuestsOptionList;
