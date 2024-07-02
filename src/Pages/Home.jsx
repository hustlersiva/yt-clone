import React, { useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Categories from "../Components/Categories";
import Videos from "../Components/Videos";
import { getFirestore, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { videoID } from "../static/data";

const Home = () => {
  const db = getFirestore();
  const timestamp = serverTimestamp();
  useEffect(() => {
    const fetchVideoDetails = async (videoId) => {
      const apiKey = "AIzaSyCmQnEbJ4ZDfrZ5Qh_os2mB3qShNYeMawo";
      const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;

      try {
        // Fetch video details
        const videoResponse = await axios.get(videoUrl);
        const videoDetails = videoResponse.data.items[0].snippet;
        const contentDetails = videoResponse.data.items[0].contentDetails;
        const statistics = videoResponse.data.items[0].statistics;

        // Fetch channel details
        const channelId = videoDetails.channelId;
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
        const channelResponse = await axios.get(channelUrl);
        const channelDetails = channelResponse.data.items[0].snippet;
        const channelStatistics = channelResponse.data.items[0].statistics;
        console.log(channelStatistics);

        // Construct video data object
        const videoData = {
          videoId: videoId,
          title: videoDetails.title,
          channelId: videoDetails.channelId,
          description: videoDetails.description,
          duration: contentDetails.duration,
          thumbnailUrl: videoDetails.thumbnails.high.url,
          publishedAt: videoDetails.publishedAt,
          viewCount: statistics.viewCount,
          channelName: channelDetails.title,
          channelLogo: channelDetails.thumbnails.high.url,
          subscribers: channelStatistics.subscriberCount,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
          timestamp: timestamp,
          likeCount: statistics.likeCount,
          dislikeCount: statistics.dislikeCount || "Not Available",
        };

        // Save to Firestore

        const uploadVideoData = async (videoData) => {
          try {
            // Use videoId as document ID to ensure uniqueness
            const docRef = doc(db, "videos", videoData.videoId);
            await setDoc(docRef, videoData, { merge: true });
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        };

        uploadVideoData(videoData);
      } catch (error) {
        console.error("Error fetching or saving video details:", error);
      }
    };
    for (let i = 0; i < videoID.length; i++) {
      fetchVideoDetails(videoID[i]);
    }
  }, []);
  return (
    <div>
      <Sidebar />
      <Categories />
      <Videos />
    </div>
  );
};

export default Home;
