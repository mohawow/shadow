import React, { Component } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Trips from "./components/trips";
import TripForm from "./components/tripForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {user: ''};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
    
  }

  render() {
    const { user } = this.state;
    console.log('user: ', user);

    return (
      <div>
        <NavBar user={user} />
        <ToastContainer />
        <main className="container">
          {this.state.user ? (
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute
                path="/trips/:id"
                render={props => (
                  <TripForm {...props} user={this.state.user} />
                )}
              />
              <Route
                path="/trips"
                render={props => (
                  <Trips {...props} user={this.state.user} />
                )}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/trips" />
              <Redirect to="/not-found" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}

export default withRouter(App);
