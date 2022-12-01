import './App.css';
// Router
import { Routes, Route } from "react-router-dom";
// Features
import Home from "./features/home/Home";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import BusinessSearch from "./features/business/BusinessSearch";

function App() {
  return (
    <div id="app">
      <div id="app-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="business-search" element={<BusinessSearch/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
