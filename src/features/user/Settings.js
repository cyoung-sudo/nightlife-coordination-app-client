import "./Settings.css";
// React
import { useState, useEffect } from "react";
// APIs
import * as authAPI from "../../apis/authAPI";
import * as userAPI from "../../apis/userAPI";
import * as userSearchAPI from "../../apis/userSearchAPI";
import * as userBusinessAPI from "../../apis/userBusinessAPI";

export default function Settings(props) {
  // Requested data
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  //----- Checks authentication on load
  useEffect(() => {
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
        setAuthenticated(true);
      } else {
        props.handlePopup(res.data.message, "error");
        props.handleExpiredSession();
      }
    })
    .catch(err => console.log(err));
  })

  //----- Deletes user account
  const handleDelete = () => {
    let result = window.confirm("Are you sure you want to delete your account?");
    if(result) {
      // Check authentication
      authAPI.getUser()
      .then(res => {
        if(res.data.success) {
          // Delete user-searches
          return userSearchAPI.deleteForUser(user._id);
        } else {
          return {data: {success: false }};
        }
      })
      .then(res => {
        if(res.data.success) {
          // Delete user-businesses
          return userBusinessAPI.deleteForUser(user._id);
        } else {
          return {data: {success: false }};
        }
      })
      .then(res => {
        if(res.data.success) {
          // Delete user
          return userAPI.deleteUser();
        } else {
          return {data: {success: false }};
        }
      })
      .then(res => {
        if(res.data.success) {
          // Logout user
          return authAPI.logout();
        } else {
          return {data: {success: false }};
        }
      })
      .then(res => {
        if(res.data.success) {
          props.handlePopup("Deleted account", "success");
          props.handleExpiredSession();
        }
      })
      .catch(err => console.log(err));
    }
  };

  if(authenticated) {
    return (
      <div id="settings">
        <div id="settings-header">
          <h1>Account Settings</h1>
        </div>
  
        <ul id="settings-list">
          <li className="settings-group">
            <div>Delete Account?</div>
            <button
              data-testid="settings-delete"
              onClick={handleDelete}>
              Delete
            </button>
          </li>
        </ul>
      </div>
    );
  }
};