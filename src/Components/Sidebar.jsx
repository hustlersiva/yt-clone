import React from "react";
import "../App.css";
import { SideBarItems } from "../static/data";
import { useState } from "react";
const Sidebar = () => {
  const [active, setactive] = useState("Home");
  return (
    <>
      <div className="scrollbar-hide w-52 bg-yt-black h-[calc(100vh-56px)] mt-14 fixed top-0 left-0 text-yt-white p-3 overflow-scroll">
        {SideBarItems.top.map((item, index) => (
          <div
            className={`flex items-center  my-3 rounded-full mx-2 py-2 pl-1 cursor-pointer  hover:bg-yt-light-black ${
              item.name === active ? "bg-yt-light-black" : "bg-yt-black"
            }`}
            key={index}
            onClick={() => setactive(item.name)}
          >
            {item.icon} <span className="ml-4">{item.name}</span>
          </div>
        ))}
        <hr className="border border-yt-light-black" />
        {SideBarItems.middle.map((item, index) => (
          <div
            className="flex items-center  my-3 rounded-full mx-2 py-2 pl-1 cursor-pointer  hover:bg-yt-light-black"
            key={index}
          >
            {item.icon} <span className="ml-4">{item.name}</span>
          </div>
        ))}
        <hr className="border border-yt-light-black" />
        <p className="mt-2 text-center ">Explore</p>
        {SideBarItems.bottom.map((item, index) => (
          <div
            className="flex items-center  my-3 rounded-full mx-2 py-2 pl-1 cursor-pointer  hover:bg-yt-light-black"
            key={index}
          >
            {item.icon} <span className="ml-4">{item.name}</span>
          </div>
        ))}
        <hr className="border border-yt-light-black" />
      </div>
    </>
  );
};

export default Sidebar;
