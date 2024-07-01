import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Video from "./Pages/Video";
import Navbar from "./Components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { useEffect } from "react";
import { login } from "./Slices/UserSlice";

function App() {
  const dispatch = useDispatch();
  //code for persisten login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
      }
      //  else {
      //   dispatch(logout());
      // }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
