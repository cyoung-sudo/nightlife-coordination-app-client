import "./Login.css";
// React
import { useState } from "react";
// Router
import { Link, useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
// Components
import AuthForm from "../../components/auth/AuthForm";

export default function Signup(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();

  //----- Submits form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    authAPI.login(username, password)
    .then(res => {
      if(res.data.success) {
        console.log("Successfully logged-in");
        // Redirect to root route
        navigate("/");
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="login">
      <h1>Login</h1>

      <AuthForm 
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleSubmit}/>

      <div id="login-redirect">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};