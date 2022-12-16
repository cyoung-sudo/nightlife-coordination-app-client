import "./Profile.css";
// React
import { useState, useEffect } from "react";
// Router
import { useParams } from "react-router-dom";
// Components
import UserBusinessDisplay from "../../components/user/UserBusinessDisplay";
import Loading from "../../components/general/Loading";
// API
import * as userAPI from "../../apis/userAPI";
import * as userBusinessAPI from "../../apis/userBusinessAPI";
import * as businessAPI from "../../apis/businessAPI";
import * as authAPI from "../../apis/authAPI";


export default function Profile(props) {
  // Requested data
  const [user, setUser] = useState(null);
  const [businesses, setBusinesses] = useState(null);
  // Manual refresh
  const [refresh, setRefresh] = useState(false);
  // Hooks
  const { id } = useParams();

  //----- Retrieve given user & related businesses
  useEffect(() => {
    // Retrieve user
    userAPI.getOne(id)
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      }
      // Retrieve related user-buisnesses
      return userBusinessAPI.getForUser(res.data.user._id);
    })
    .then(res => {
      // Retrieve related buisnesses
      return businessAPI.getBusinesses(res.data.userBusinesses);
    })
    .then(res => {
      if(res.data.success) {
        setBusinesses(res.data.businesses);
      } else {
        props.handlePopup(res.data.message, "error");
      }
    })
    .catch(err => console.log(err));
  }, [refresh]);

  //----- Removes business for given user
  const handleRemove = businessId => {
    // Retrieve user
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        // Delete user-business
        return userBusinessAPI.deleteUserBusiness(res.data.user._id, businessId);
      } else {
        return { error: res.data.message };
      }
    })
    .then(res => {
      if(res.error) {
        props.handlePopup(res.error, "error");
        props.handleExpiredSession();
      } else if(res.data.success) {
        props.handlePopup("Business removed", "success");
        // Refresh component
        setRefresh(state => !state);
      }
    })
    .catch(err => console.log(err));
  };

  if(user && businesses) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{user.username}'s Profile</h1>
        </div>

        <div id="profile-userBusinesses-wrapper">
          <UserBusinessDisplay 
            currentUser={props.user}
            profileUser={user}
            businesses={businesses}
            handleRemove={handleRemove}/>
        </div>
      </div>
    );
  } else {
    return <Loading/>;
  }
};