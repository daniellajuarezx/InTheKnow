import {useState} from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import './style.css';

export default function App() {
  const [uname, unameSetter] = useState(null);

  const handleLogout = () => {
    unameSetter(null);
  }

  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home uname={uname} />} />
          <Route path="login" element={<Login  
            uname={uname} unameSetter={unameSetter}/>} />
          <Route path="register" element={<Register
            uname={uname} unameSetter={unameSetter}/>} />
          <Route path="logout" element={<Logout uname={uname} handleLogout={handleLogout} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}