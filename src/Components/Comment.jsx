import React from "react";
import moment from "moment";
import { BiLike, BiDislike } from "react-icons/bi";

const Comment = ({ image, name, comment, uploaded }) => {
  return (
    <div className="flex flex-row mt-4 items-start">
      <img src={image} alt={name} className="size-11 rounded-full mr-3" />
      <div className=" ">
        <div className=" flex items-center justify-center">
          <p className="text-yt-white font-semibold">{name}</p>
          <p className="text-yt-white text-xs ml-4">
            {moment(uploaded.toDate()).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
        <p className="text-yt-white mt-2">{comment}</p>
        <div className="flex py-3 justify-between w-36">
          <div className="flex">
            <BiLike size={24} className="cursor-pointer" />
            <p className="text-sm px-2 text-yt-gray">24</p>
            <BiDislike size={24} className="cursor-pointer ml-2" />
            <p className="text-sm px-2 text-yt-gray hover:bg-yt-gray rounded-2xl hover:text-yt-white ml-2">
              Reply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
