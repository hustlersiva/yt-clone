import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Video from "../Components/Video";
import "../App.css"; // Ensure to import your CSS file if not already done

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "videos"));
    onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  return (
    <div className=" yt-scrollbar scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700 scrollbar-track-gray-300 px-5 bg-yt-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-[calc(100%-190px)] ml-48">
      {videos.length === 0 ? (
        <div className="h-[86vh]">No videos available</div>
      ) : (
        videos.map((video, i) => (
          <Link to={`video/${video.id}`} key={i}>
            <Video {...video} />
          </Link>
        ))
      )}
    </div>
  );
};

export default Videos;
