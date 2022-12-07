import './App.css';
// React
import { useState } from "react";
// Router
import { Routes, Route } from "react-router-dom";
// Features
import Home from "./features/home/Home";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import BusinessSearch from "./features/business/BusinessSearch";
import AllUsers from "./features/user/AllUsers";
import Profile from "./features/user/Profile";
// Components
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import Popup from "./components/general/Popup";

function App() {
  // Popup message
  const [message, setMessage] = useState("");
  const [msgMode, setMsgMode] = useState("");

  // Handles popups
  const handlePopup = (message, mode) => {
    setMessage(message);
    setMsgMode(mode);
  };

  return (
    <div id="app">
      <Navbar/>

      <div id="app-content">
        {message &&
          <Popup
            message={message}
            msgMode={msgMode}
            handlePopup={handlePopup}/>
        }

        <Routes>
          <Route path="/" element={<Home/>}/>

          {/*----- Auth routes -----*/}
          <Route path="signup" element={
            <Signup handlePopup={handlePopup}/>
          }/>
          <Route path="login" element={
            <Login handlePopup={handlePopup}/>
          }/>
          {/*----- /Auth routes -----*/}

          {/*----- User routes -----*/}
          <Route path="users">
              <Route index element={<AllUsers/>}/>
              <Route path=":id" element={<Profile/>}/>
          </Route>
          {/*----- /User routes -----*/}

          <Route path="business-search" element={<BusinessSearch/>}/>
        </Routes>
      </div>

      <Footer/>
    </div>
  );
}

export default App;
