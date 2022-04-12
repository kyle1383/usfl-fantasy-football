import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class CreateLeague extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      owner: "",
      size: 8,
      published_date: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSelect = (e) => {
    this.setState({ size: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      owner: this.props.auth.user.id,
      size: this.state.size,
      published_date: Date.now,
    };

    axios
      .post("/api/leagues/", data)
      .then((res) => {
        this.setState({
          name: "",
          owner: this.props.auth.user.id,
          size: 8,
          published_date: Date.now,
        });
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log("Error in CreateLeague!");
      });
  };

  render() {
    return (
      <div className="CreateLeague">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Leagues
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add League</h1>
              <p className="lead text-center">Create new league</p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="League Name"
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChange}
                  />

                  <label>
                    Team Size
                    <select
                      value={this.state.value}
                      onChange={this.handleSelect}
                      defaultValue="8"
                    >
                      <option value="2">2</option>
                      <option value="4">4</option>
                      <option value="6">6</option>
                      <option value="8">8</option>
                      <option value="10">10</option>
                      <option value="12">12</option>
                    </select>
                  </label>
                </div>
                <br />

                <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateLeague.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(CreateLeague);
