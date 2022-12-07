import "./AllUsers.css";
// React
import { useState, useEffect } from "react";
// Components
import UserDisplay from "../../components/user/UserDisplay";
// APIs
import * as userAPI from "../../apis/userAPI";

export default function AllUsers(props) {
  // Requested data
  const [users, setUsers] = useState(null);

  // Retrieve all users
  useEffect(() => {
    userAPI.getAll()
    .then(res => {
      if(res.data.success) {
        setUsers(res.data.users);
      }
    })
    .catch(err => console.log(err));
  }, []);

  if(users) {
    return (
      <div id="displayUsers">
        <div id="displayUsers-header">
          <h1>Users</h1>
        </div>

        <div id="displayUsers-users-wrapper">
          <UserDisplay users={users}/>
        </div>
      </div>
    );
  }
};