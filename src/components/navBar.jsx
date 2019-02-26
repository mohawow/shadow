import React from "react";
import { Link, NavLink } from "react-router-dom";



const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
      <Link className="navbar-brand" to="/">
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
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup" >
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link fa fa-automobile" style={{ fontSize:22 }} to="/trips">
            Trips
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link  fa fa-sign-in" style={{ fontSize:22 }}  to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link fa fa-registered" style={{ fontSize:22 }} to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link fa fa-user" style={{ fontSize:22 }} to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link fa fa-sign-out" style={{ fontSize:22 }} to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
