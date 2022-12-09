import "./Profile.css";
// React
import { useState, useEffect } from "react";
// Router
import { useParams } from "react-router-dom";
// Components
import UserBusinessDisplay from "../../components/user/UserBusinessDisplay";
// API
import * as userAPI from "../../apis/userAPI";
import * as userBusinessAPI from "../../apis/userBusinessAPI";
import * as businessAPI from "../../apis/businessAPI";

export default function Profile(props) {
  // Requested data
  const [user, setUser] = useState(null);
  const [businesses, setBusinesses] = useState(null);
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
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(user && businesses) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{user.username}'s Profile</h1>
        </div>

        <div id="profile-userBusinesses-wrapper">
          <UserBusinessDisplay 
            user={props.user}
            businesses={businesses}/>
        </div>
      </div>
    );
  }
};