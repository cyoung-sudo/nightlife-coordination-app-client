import "./UserDisplay.css";
// Routing
import { Link } from "react-router-dom";

export default function UserDisplay({users}) {
  return (
    <ul id="userDisplay">
      {users.map((user, idx) => (
        <li className="userDisplay-user" key={idx}>
          <div className="userDisplay-username">{user.username}</div>
          <div className="userDisplay-date">Joined: {new Date(user.createdAt).toDateString()}</div>
          <div className="userDisplay-links">
            <Link className="userDisplay-profile-link" to={`/users/${user._id}`}>View Profile</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}