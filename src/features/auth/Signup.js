import "./Signup.css";
// React
import { useState } from "react";
// Components
import AuthForm from "../../components/auth/AuthForm";

export default function Signup(props) {
  // Controlled inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();
  };

  return (
    <div id="signup">
      <h1>Signup</h1>

      <AuthForm 
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleSubmit}/>
    </div>
  );
};