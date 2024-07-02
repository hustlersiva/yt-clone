import React from "react";
import { MdDensityMedium } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TiMicrophone } from "react-icons/ti";
import { BiVideoPlus } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { auth, provider } from "../firebase";
import ytlogo from "../assets/yt.png";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../Slices/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user.userdata);

  const handleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      dispatch(login(response.user));
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  const handlelogout = async () => {
    try {
      await auth.signOut(); //persistent log out

      dispatch(logout());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  // console.log(userdata);
  return (
    <nav className="bg-yt-black h-14 flex items-center justify-between fixed w-full px-4 z-10">
      <div className="flex items-center space-x-4">
        <div className="text-yt-white p-2 w-10 text-2xl text-center hover:bg-yt-light-black rounded-full cursor-pointer new-effect">
          <MdDensityMedium />
        </div>
        <div className="w-24">
          <Link to="/">
            <img src={ytlogo} alt="YouTube Logo" className="object-cover" />
          </Link>
        </div>
      </div>
      <div className="flex flex-1 justify-center font-sans">
        <div className="flex items-center w-full max-w-2xl">
          <input
            className="w-full bg-yt-black text-yt-white text-sm focus:outline-none rounded-l-full px-4 py-2 hover:text-yt-white  border-yt-white"
            type="search"
            placeholder="Search"
            autoComplete="off"
          />
          <button className="bg-yt-black px-4 py-2 rounded-r-none border-l border-yt-black hover:bg-yt-light-black">
            <FaSearch size={18} className="text-yt-white" />
          </button>
          <button className="bg-yt-black px-4 py-2 ml-2 rounded-full border border-yt-black hover:bg-yt-light-black">
            <TiMicrophone size={20} className="text-yt-white " />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <BiVideoPlus
          size={45}
          className="text-yt-white rounded-full w-10 py-2 px-1  bg-yt-black text-xl text-center hover:bg-yt-light-black cursor-pointer new-effect"
        />
        <FaBell
          size={38}
          className="text-yt-white rounded-full w-10 py-2 px-1  bg-yt-black text-xl text-center hover:bg-yt-light-black cursor-pointer new-effect"
        />
        {!userdata ? (
          <button
            className="bg-yt-red px-4 py-1 text-sm font-semibold rounded-full text-yt-white hover:bg-red-700"
            onClick={handleLogin}
          >
            Sign In
          </button>
        ) : (
          <img
            src={userdata.photoURL}
            alt="User Avatar"
            className="w-8 h-8 rounded-full new-effect"
            onClick={handlelogout}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
