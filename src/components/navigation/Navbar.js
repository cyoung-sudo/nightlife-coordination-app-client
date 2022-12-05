import "./Navbar.css";
// Routing
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div id="navbar">
      <div id="navbar-logo">
        Nightlife Coord
      </div>

      <ul id="navbar-links">
        <li>
          <NavLink
            to="business-search"
            end
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined
            }>Businesses</NavLink>
        </li>

        <li>
          <NavLink
            to="signup"
            end
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined
            }>Signup</NavLink>
        </li>

        <li>
          <NavLink
            to="login"
            end
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined
            }>Login</NavLink>
        </li>
      </ul>
    </div>
  );
};