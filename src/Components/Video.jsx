import React from "react";
import moment from "moment";
import { MdVerified } from "react-icons/md";

const formatDuration = (isoDuration) => {
  const duration = moment.duration(isoDuration);
  const hours = duration.hours().toString().padStart(2, "0");
  const minutes = duration.minutes().toString().padStart(2, "0");
  const seconds = duration.seconds().toString().padStart(2, "0");
  return hours !== "00"
    ? `${hours}:${minutes}:${seconds}`
    : `${minutes}:${seconds}`;
};

const formatViewCount = (count) => {
  if (count < 1000) return count.toString();
  if (count < 1000000) return (count / 1000).toFixed(1) + "K";
  if (count < 1000000000) return (count / 1000000).toFixed(1) + "M";
  return (count / 1000000000).toFixed(1) + "B";
};

const Video = ({
  thumbnailUrl,
  channelLogo,
  duration,
  title,
  channelName,
  viewCount,
  publishedAt,
}) => {
  return (
    <div className=" scrollbar-hide flex flex-col max-w-[260px] cursor-pointer p-2">
      <div className="relative w-full">
        <img
          src={thumbnailUrl}
          alt=""
          className="h-full w-full overflow-hidden rounded-2xl"
        />
        <div className="absolute bg-yt-black text-yt-white rounded-md bottom-2 right-2 p-1">
          {formatDuration(duration)}
        </div>
      </div>
      <div className="flex mt-3">
        <img
          className="size-8 rounded-full"
          src={channelLogo}
          alt="Channel Logo"
        />
        <div className="ml-2">
          <h2 className="font-medium text-yt-gray text-sm mt-0 mb-0 items-center">
            {title.length > 40 ? `${title.slice(0, 40)}...` : title}
          </h2>
          <h3 className="text-yt-gray text-sm mt-1 flex items-center">
            {channelName}
            <span className=" ml-1 mt-1">
              <MdVerified />
            </span>
          </h3>
          <p className="text-yt-gray m-0 font-medium text-sm">
            {formatViewCount(viewCount)} Views · {moment(publishedAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
