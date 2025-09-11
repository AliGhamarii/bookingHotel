import OptionItem from "./OptionItem";

function GuestsOptionList({ handleOption, option }) {
  return (
    <div className="absolute top-9 w-60 py-5 px-6 bg-white rounded-2xl shadow flex flex-col gap-y-3">
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
