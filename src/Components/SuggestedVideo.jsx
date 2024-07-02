import React from "react";
import { MdVerified } from "react-icons/md";
import { formatViewCount } from "./Video";
import moment from "moment";

const SuggestedVideo = ({
  thumbnailUrl,
  channelLogo,
  duration,
  title,
  channelName,
  viewCount,
  publishedAt,
}) => {
  return (
    <>
      <div className="text-yt-white flex cursor-pointer">
        <img
          src={thumbnailUrl}
          alt=""
          className="h-32 w-52 rounded-2xl object-contain"
        />
        <div className="pl-2">
          <h2 className="text-sm font-medium">
            {title.length <= 70 ? title : `${title.substr(0, 60)}...`}
          </h2>
          <p className="text-xs text-yt-gray pt-2 flex items-center">
            {channelName}
            <span className="p-1">
              <MdVerified />
            </span>
          </p>
          <div className="flex">
            <p className="text-xs text-yt-gray pr-1">
              {formatViewCount(viewCount)} views
            </p>
            <p className="text-xs text-yt-gray pr-1">
              {moment(publishedAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestedVideo;
