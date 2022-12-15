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
            to="users"
            end
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined
            }>Users</NavLink>
        </li>

        {props.user &&
          <li>
            <NavLink
              to={`users/${props.user._id}`}
              end
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined
              }>Profile</NavLink>
          </li>
        }

        {props.user &&
          <li>
            <NavLink
              to="users/settings"
              end
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined
              }>Settings</NavLink>
          </li>
        }

        {props.user &&
          <li>
            <button onClick={props.handleLogout}>Logout</button>
          </li>
        }

        {!props.user &&
          <li>
            <NavLink
              to="signup"
              end
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined
              }>Signup</NavLink>
          </li>
        }

        {!props.user &&
          <li>
            <NavLink
              to="login"
              end
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined
              }>Login</NavLink>
          </li>
        }
      </ul>
    </div>
  );
};