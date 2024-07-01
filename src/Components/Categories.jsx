import React from "react";
import { names } from "../static/data";

const Categories = () => {
  return (
    <>
      <div className="bg-yt-black h-[calc(100%-56px)] w-[calc(100%-208px)] ml-52 pt-14 border border-b-yt-gray ">
        <div className="flex flex-row px-3 items-center py-1 overflow-x-scroll relative scrollbar-hide">
          {names.map((item, i) => {
            return (
              <h1
                key={i}
                className="text-yt-white text-sm py-1 px-4 break-normal  whitespace-nowrap cursor-pointer rounded-2xl  hover:bg-yt-light-black "
              >
                {item}
              </h1>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Categories;
