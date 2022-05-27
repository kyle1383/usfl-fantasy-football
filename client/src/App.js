import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "./styles/Buttons.css";
import "./styles/Form.css";
import AuthService from "./services/auth.service";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import Profile from "./components/auth/Profile";
import BoardUser from "./components/BoardUser";
import Dashboard from "./components/dashboard/Dashboard";
import League from "./components/league/League";
import Invite from "./components/league/Invite";
import Landing from "./components/layout/Landing";
import Draft from "./components/draft/Draft";
import Nav from "./components/layout/Nav";
import CreateLeague from "./components/league/CreateLeague";
import UpdateDraft from "./components/draft/UpdateDraft";
import UpdateLeague from "./components/league/UpdateLeague";
import axios from "axios";
import RequireAuth from "./components/private-route/RequireAuth";
import RootRedirect from "./components/private-route/RootRedirect";
import "./styles/Fonts.css";
import Admin from "./components/auth/Admin";

const App = () => {
  if (process.env.NODE_ENV !== "production") {
    const API_URL = "http://localhost:5000";
    axios.defaults.baseURL = API_URL;
  }

  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/draft/:id" element={<Draft />} />
        <Route path="/draft-settings/:id" element={<UpdateDraft />} />
        <Route path="/league-settings/:id" element={<UpdateLeague />} />

        <Route
          path="/"
          element={
            <RootRedirect>
              <Dashboard />
            </RootRedirect>
          }
        />
        <Route path="/landing" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route exact path="/leagues/:id" element={<League />} />

        <Route path="/new-league" element={<CreateLeague />} />
        <Route
          exact
          path="/leagues/:id/invite"
          element={
            <RequireAuth>
              <Invite />
            </RequireAuth>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
