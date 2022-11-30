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
    
    authAPI.signup(username, password)
    .then(res => {
      if(res.data.success) {
        console.log("Account created");
        // Redirect to login route
        navigate("/login");
      } else {
        console.log(res.data.message);
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="signup">
      <h1>Signup</h1>

      <AuthForm 
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleSubmit}/>

      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};