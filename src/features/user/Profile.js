import "./Profile.css";
// React
import { useState, useEffect } from "react";
// Router
import { useParams } from "react-router-dom";
// API
import * as userAPI from "../../apis/userAPI";

export default function Profile(props) {
  // Requested data
  const [user, setUser] = useState(null);
  // Hooks
  const { id } = useParams();

  // Retrieve given user
  useEffect(() => {
    userAPI.getOne(id)
    .then(res => {
      if(res.data.success) {
        setUser(res.data.user);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(user) {
    return (
      <div id="profile">
        <div id="profile-header">
          <h1>{user.username}'s Profile</h1>
        </div>
      </div>
    );
  }
};