import "./Home.css";
// Router
import { Link } from "react-router-dom";

export default function Home(props) {
  return (
    <div id="home">
      <div id="home-header">
        <h1>Nightlife Coordination</h1>
        <p>Get started today</p>
      </div>

      <ul id="home-links">
        <li>
          <Link to="/business-search">Browse Businesses</Link>
        </li>
        <li>
          <Link to="/signup">Create Account</Link>
        </li>
      </ul>
    </div>
  );
};