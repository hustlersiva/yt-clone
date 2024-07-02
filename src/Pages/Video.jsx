import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  Timestamp,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { MdOutlineSort, MdVerified } from "react-icons/md";
import { formatViewCount } from "../Components/Video";
import { AiFillLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import moment from "moment";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal, HiDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../Components/Comment"; // Import the Comment component
import { names } from "../static/data";
import SuggestedVideo from "../Components/SuggestedVideo";
import { Link } from "react-router-dom";

const Video = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "videos"));
    onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);
  const [comments, setComments] = useState([]); // Comments from the database
  const [commentText, setCommentText] = useState(""); // For user input
  const [data, setData] = useState({});
  const [isDescriptionTruncated, setIsDescriptionTruncated] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user.userdata);

  useEffect(() => {
    let unsubscribe;
    let unsubscribeComments;

    if (id) {
      const videoDocRef = doc(db, "videos", id);

      // Fetch video data
      unsubscribe = onSnapshot(
        videoDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.data());
          } else {
            console.log("Document does not exist");
          }
        },
        (error) => {
          console.error("Error fetching document: ", error);
        }
      );

      // Fetch comments
      const commentsQuery = query(collection(db, "videos", id, "comments"));
      unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
      if (unsubscribeComments) unsubscribeComments();
    };
  }, [id]);

  const toggleDescription = () => {
    setIsDescriptionTruncated(!isDescriptionTruncated);
  };

  const addComment = async (e) => {
    e.preventDefault();
    let newComment = {
      image: userdata?.photoURL,
      name: userdata?.displayName,
      comment: commentText,
      uploaded: Timestamp.now(),
    };
    if (id) {
      await addDoc(collection(db, "videos", id, "comments"), newComment);
      console.log("Comment added");
      setCommentText("");
    }
  };

  return (
    <div className="bg-yt-black flex flex-row items-center justify-between py-20 h-full px-9">
      <div className="left  flex-1 mb-[1800px]">
        <div className="flex justify-center">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-[850px] h-[720px] flex-1 "
          ></iframe>
        </div>
        <h2 className="text-yt-white font-semibold mt-3 mb-1 text-lg">
          {data.title}
        </h2>
        <div className="flex mt-2 justify-between">
          <div className="flex items-center">
            <img
              src={data.channelLogo}
              alt="channellogo"
              className="size-9 rounded-full"
            />
            <div className="px-3">
              <h3 className="font-medium text-yt-white text-base flex">
                {data?.channelName && data?.channelName.length <= 15
                  ? data?.channelName
                  : `${data?.channelName?.substr(0, 10)}...`}
                <span>
                  <MdVerified className="mt-1 ml-1" />
                </span>
              </h3>
              <p className="text-sm text-yt-gray">
                {`${formatViewCount(data.subscribers)} subscribers`}
              </p>
            </div>
          </div>
          <button className="bg-yt-light-black px-3 py-2 text-yt-white rounded-lg text-lg font-medium hover:bg-yt-light-1">
            Subscribe
          </button>
          <div className="flex pl-28">
            <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 hover:bg-yt-light-1">
              <div className="flex px-3 items-center border-r-2 border-r-yt-light-1 cursor-pointer">
                <AiFillLike className="text-2xl text-yt-white font-extralight" />
                <p className="text-yt-white mx-1 text-sm font-semibold">
                  {formatViewCount(data.likeCount)}
                </p>
              </div>
              <div className="pl-4 pr-5 border-2 border-l-yt-white cursor-pointer border-r-0 border-t-0 border-b-0">
                <BiDislike className="text-2xl text-yt-white font-extralight" />
              </div>
            </div>
            <div className="flex ml-10 hover:text-yt-white bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer">
              <div className="flex px-3 items-center cursor-pointer">
                <RiShareForwardLine className="text-2xl text-yt-white font-thin" />
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  Share
                </p>
              </div>
            </div>
            <div className="flex ml-10 hover:text-yt-white bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer">
              <div className="flex px-3 items-center cursor-pointer">
                <HiDownload className="text-2xl text-yt-white font-thin" />
                <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                  Download
                </p>
              </div>
            </div>
            <div className="flex bg-yt-light-black hover:bg-yt-light-1 cursor-pointer items-center rounded-full justify-center w-10 h-10 text-yt-white">
              <HiDotsHorizontal className="text-2xl text-yt-white" />
            </div>
          </div>
        </div>
        <div className="max-w-4xl bg-yt-light-black mt-4 rounded-2xl p-3 text-sm text-yt-white">
          <div className="flex">
            <p className="font-medium pr-3 text-yt-white">
              {formatViewCount(data.viewCount)}
              <span className="pl-1 font-semibold">Views</span>
            </p>
            <p>{moment(data.publishedAt).fromNow()}</p>
          </div>
          <span className="font-medium text-center">
            {data?.description && data.description.length > 150
              ? isDescriptionTruncated
                ? `${data.description.substring(0, 150)}...`
                : data.description
              : data?.description}
            {data?.description && data.description.length > 150 && (
              <span
                onClick={toggleDescription}
                className="text-yt-gray cursor-pointer ml-2"
              >
                {isDescriptionTruncated ? "read more" : "show less"}
              </span>
            )}
          </span>
        </div>
        <div className="text-yt-white mt-5">
          <div className="flex items-center">
            <h1>{comments.length} Comments</h1>
            <div className="flex mx-10 items-center">
              <MdOutlineSort size={30} className="mx-3" />
              <p>Sort By</p>
            </div>
          </div>
          <div>
            {userdata && (
              <form
                onSubmit={addComment}
                className="flex w-[800px] pt-4 items-center"
              >
                <img
                  src={userdata?.photoURL}
                  alt="user-avatar"
                  className="size-9 rounded-full"
                />
                <input
                  type="text"
                  name="commentText"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment"
                  className="bg-[transparent] border-b border-b-yt-light-black outline-none text-sm p-2 w-full ml-2"
                />
              </form>
            )}
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
              ))
            ) : (
              <p className="text-yt-white mt-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="right px-3 overflow-y-hidden flex-[0.4] py-0 ml-2">
        <div>
          <div className="flex flex-row px-3 overflow-x-scroll relative scrollbar-hide">
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
        <div className="pt-8">
          {videos.map((video, i) => {
            if (video.id !== id) {
              return (
                <Link key={i} to={`/video/${video.id}`}>
                  <SuggestedVideo {...video} />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Video;
