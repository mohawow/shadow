import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../index.css";
import "../App.css";
import "./component.css"



const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-brand topnav navbar-expand-lg navbar-light bg-light" style={{ fontSize:36, color: "#313941"}} >
      <Link className=" shadow fa fa-cubes" to="/">
        Shadow
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
        <div className="navbar-nav" >
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link  fa fa-sign-in" style={{ fontSize:26 }}  to="/login">
                Login
              </NavLink>
              <Link className="nav-item nav-link fa fa-registered" style={{ fontSize:26 }} to="/register">
                Register
              </Link>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link fa fa-automobile" style={{ fontSize:26 }} to="/trips">
                Trips
             </NavLink>
              <NavLink className="nav-item nav-link fa fa-user" style={{ fontSize:26 }} to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link fa fa-sign-out" style={{ fontSize:26 }} to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
    </nav>
  );
};

export default NavBar;
