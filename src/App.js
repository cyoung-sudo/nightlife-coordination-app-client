import './App.css';
// Router
import { Routes, Route } from "react-router-dom";
// Features
import Home from "./features/home/Home";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import BusinessSearch from "./features/business/BusinessSearch";
// Components
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";

function App() {
  return (
    <div id="app">
      <Navbar/>

      <div id="app-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="business-search" element={<BusinessSearch/>}/>
        </Routes>
      </div>

      <Footer/>
    </div>
  );
}

export default App;
