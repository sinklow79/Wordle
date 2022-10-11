import React, {memo} from "react";

const Navbar = memo(({handleStatsClick}) => {
  return (
    <div className="w-full h-[65px] relative flex justify-end items-center px-[20px] border-b">
      <span className="absolute left-1/2 -translate-x-1/2 text-3xl font-extrabold">Wordle</span>
      <span onClick={handleStatsClick} className="cursor-pointer font-semibold py-[5px]">Stats</span>
    </div>
  );
});

export default Navbar;
