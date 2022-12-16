import "./Navbar.css";
// React
import { useState } from "react";
// Router
import { NavLink } from "react-router-dom";
// Icons
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar(props) {
  // Collapsed-menu status
  const [collapsed, setCollapsed] = useState(true);

  //----- Toggles collapsed menu
  const handleCollapse = () => {
    setCollapsed(state => !state);
  };
  
  return (
    <div id="navbar">
      <div id="navbar-logo">
        Nightlife Coord
      </div>

      <div id="navbar-collapse-toggle" className={collapsed ? "" : "navbar-collapse-active"}>
        <button onClick={handleCollapse}><GiHamburgerMenu/></button>
      </div>

      {/*----- Navlinks -----*/}
      <ul id="navbar-links">
        <li>
          <NavLink
            to="businesses/search"
            end
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined
            }>Search</NavLink>
        </li>

        <li>
          <NavLink
            to="businesses/attendance"
            end
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined
            }>Attendance</NavLink>
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
      {/*----- /Navlinks -----*/}

      {/*----- Collapsed navlinks -----*/}
      {!collapsed &&
        <ul id="navbar-links-collapsed">
          <li>
            <NavLink
              to="businesses/search"
              end
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined
              }>Search</NavLink>
          </li>

          <li>
            <NavLink
              to="businesses/attendance"
              end
              className={({ isActive }) =>
                isActive ? "navbar-active" : undefined
              }>Attendance</NavLink>
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
      }
      {/*----- /Collapsed navlinks -----*/}
    </div>
  );
};