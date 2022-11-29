import "./AuthForm.css";

export default function AuthForm({setUsername, setPassword, handleSubmit}) {
  return (
    <form id="authForm" onSubmit={handleSubmit}>
      <div className="authForm-input">
        <label htmlFor="authForm-username">Username</label>
        <input
          onChange={e => setUsername(e.target.value)}
          type="text" 
          id="authForm-username"
          placeholder="username"/>
      </div>

      <div className="authForm-input">
        <label htmlFor="authForm-password">Password</label>
        <input
          onChange={e => setPassword(e.target.value)}
          type="text" 
          id="authForm-password"
          placeholder="password"/>
      </div>

      <div className="authForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};