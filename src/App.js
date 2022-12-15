import './App.css';
// React
import { useState, useEffect } from "react";
// Router
import { Routes, Route, useNavigate } from "react-router-dom";
// Features
import Home from "./features/home/Home";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import BusinessSearch from "./features/business/BusinessSearch";
import AllUsers from "./features/user/AllUsers";
import Profile from "./features/user/Profile";
import Settings from "./features/user/Settings";
// Components
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import Popup from "./components/general/Popup";
// APIs
import * as authAPI from "./apis/authAPI";

function App() {
  // Requested data
  const [user, setUser] = useState(null);
  // Popup message
  const [message, setMessage] = useState("");
  const [msgMode, setMsgMode] = useState("");
  // Hooks
  const navigate = useNavigate();

  //----- Retrieve authenticated user
  useEffect(() => {
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      }
    })
    .catch(err => console.log(err));
  }, []);

  //----- Handles popups
  const handlePopup = (message, mode) => {
    setMessage(message);
    setMsgMode(mode);
  };

  //----- Handle logout
  const handleLogout = () => {
    authAPI.logout()
    .then(res => {
      if(res.data.success) {
        handlePopup("Successfully logged-out", "success");
        setUser(null);
        // Redirect to root route
        navigate("/");
      }
    })
    .catch(err => console.log(err));
  };

  //----- Handle expired session
  const handleExpiredSession = () => {
    setUser(null);
    // Redirect to root route
    navigate("/");
  };

  return (
    <div id="app">
      <Navbar 
        user={user}
        handleLogout={handleLogout}/>

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
            <Login
              setUser={setUser}
              handlePopup={handlePopup}/>
          }/>
          {/*----- /Auth routes -----*/}

          {/*----- User routes -----*/}
          <Route path="users">
              <Route index element={<AllUsers/>}/>
              <Route path=":id" element={
                <Profile 
                  user={user}
                  handlePopup={handlePopup}
                  handleExpiredSession={handleExpiredSession}/>
              }/>
              <Route path="settings" element={
                <Settings
                  handlePopup={handlePopup}
                  handleExpiredSession={handleExpiredSession}/>
              }/>
          </Route>
          {/*----- /User routes -----*/}

          <Route path="business-search" element={
            <BusinessSearch 
              user={user}
              handlePopup={handlePopup}
              handleExpiredSession={handleExpiredSession}/>
          }/>
        </Routes>
      </div>

      <Footer/>
    </div>
  );
}

export default App;
