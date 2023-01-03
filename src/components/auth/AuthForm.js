import "./AuthForm.css";

export default function AuthForm({setUsername, setPassword, handleSubmit}) {
  return (
    <form id="authForm" onSubmit={handleSubmit}>
      <div className="authForm-input">
        <label htmlFor="authForm-username">Username</label>
        <input
          data-testid="authForm-username"
          onChange={e => setUsername(e.target.value)}
          type="text" 
          id="authForm-username"
          placeholder="username"/>
      </div>

      <div className="authForm-input">
        <label htmlFor="authForm-password">Password</label>
        <input
          data-testid="authForm-password"
          onChange={e => setPassword(e.target.value)}
          type="password" 
          id="authForm-password"
          placeholder="password"/>
      </div>

      <div className="authForm-submit">
        <input
          data-testid="authForm-submit"
          type="submit"
          value="Submit"/>
      </div>
    </form>
  );
};