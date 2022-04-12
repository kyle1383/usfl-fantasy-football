import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateLeague from "./components/league/CreateLeague";
import CreateBook from "./components/CreateBook";
import LeagueList from "./components/league/LeagueList";
import League from "./components/league/League";
import Invite from "./components/league/Invite";
import Draft from "./components/draft/Draft";
import UpdateDraft from "./components/draft/UpdateDraft";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route path="/new-league" component={CreateLeague} />
            <Switch>
              <Route exact path="/leagues" component={LeagueList} />
              <Route exact path="/leagues/:id" component={League} />
              <PrivateRoute
                exact
                path="/leagues/:id/invite"
                component={Invite}
              />
            </Switch>
            <Switch>
              <Route path="/draft/:id" component={Draft} />
              <Route path="/draft-settings/:id" component={UpdateDraft} />
            </Switch>

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            <Route path="/create-book" component={CreateBook} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
