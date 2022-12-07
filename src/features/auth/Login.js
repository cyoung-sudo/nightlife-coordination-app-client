import "./Login.css";
// React
import { useState } from "react";
// Router
import { Link, useNavigate } from "react-router-dom";
// APIs
import * as authAPI from "../../apis/authAPI";
// Components
import AuthForm from "../../components/auth/AuthForm";

export default function Login(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Hooks
  const navigate = useNavigate();

  //----- Submits form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    // Validations
    if(username === "") {
      props.handlePopup("No username given", "error");
    } else if(password === "") {
      props.handlePopup("No password given", "error");
    } else {
      authAPI.login(username, password)
      .then(res => {
        if(res.data.success) {
          props.handlePopup("Successfully logged-in", "success");
          // Redirect to profile route
          navigate(`/users/${res.data.user._id}`);
        } else {
          props.handlePopup(res.data.message, "error");
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="login">
      <div id="login-header">
        <h1>Login</h1>
      </div>

      <div id="login-form-wrapper">
        <AuthForm 
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}/>
      </div>

      <div id="login-redirect">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};