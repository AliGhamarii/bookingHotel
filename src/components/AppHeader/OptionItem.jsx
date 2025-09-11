import { PlusIcon } from "@heroicons/react/16/solid";
import { MinusIcon } from "@heroicons/react/16/solid";

function OptionItem({ type, handleOption, option, minLimit }) {
  return (
    <div className="flex justify-between items-center">
      <p>{type}</p>
      <div className="flex w-1/2 justify-between">
        <button
          onClick={() => handleOption(type, "dec")}
          className="bg-gray-200 rounded-sm cursor-pointer"
          disabled={option[type] <= minLimit}
        >
          <MinusIcon className="w-6 h-6 p-1 " />
        </button>
        <div>{option[type]}</div>
        <button
          onClick={() => handleOption(type, "inc")}
          className="bg-gray-200 rounded-sm cursor-pointer"
        >
          <PlusIcon className="w-6 h-6 p-1 " />
        </button>
      </div>
    </div>
  );
}

export default OptionItem;
