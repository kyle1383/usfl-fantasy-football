import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import axios from "axios";
import Button from "@mui/material/Button";
const Home = () => {
  const [content, setContent] = useState("");
  function refresh() {
    axios.post("/api/players/refresh");
  }
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <Button variant="contained" type="button" onClick={() => refresh()}>
        Update Players
      </Button>
    </div>
  );
};
export default Home;
