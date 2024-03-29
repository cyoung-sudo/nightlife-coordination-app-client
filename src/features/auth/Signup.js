import "./Signup.css";
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

    // Validations
    if(username === "") {
      props.handlePopup("No username given", "error");
    } else if(password === "") {
      props.handlePopup("No password given", "error");
    } else {
      authAPI.signup(username, password)
      .then(res => {
        if(res.data.success) {
          props.handlePopup("Account created", "success");
          // Redirect to login route
          navigate("/login");
        } else {
          props.handlePopup(res.data.message, "error");
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <div id="signup">
      <div id="signup-header">
        <h1>Signup</h1>
      </div>

      <div id="signup-form-wrapper">
        <AuthForm 
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}/>
      </div>

      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};