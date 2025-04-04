import { useState, useEffect} from "react";
import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return (
      <div>
      <nav>
          <ul>
            <li className="navbar">
              <Link to="/">Home</Link>&nbsp;&nbsp;
            </li>
            <li className="navbar">
              <Link to="/login">Login</Link>&nbsp;&nbsp;
            </li>
            <li className="navbar">
              <Link to="/register">Register</Link>&nbsp;&nbsp;
            </li>
            <li className="navbar">
              <Link to="/logout">Logout</Link>&nbsp;&nbsp;
            </li>
          </ul>
        </nav>
        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    )
  };
  export default Layout; 