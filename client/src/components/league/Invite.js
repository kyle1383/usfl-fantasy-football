import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

/**
 * INVITE COMPONENT
 * 1st checks if you are logged in. If not, requests a login.
 */
class Invite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      league: {},
      user: {},
    };
  }
  onJoinClick = (e) => {
    const data = {
      user: this.props.auth.user.id,
    };

    axios
      .put("/api/leagues/join/" + this.props.match.params.id, data)
      .then((res) => {
        this.setState({
          user: {},
        });
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("Error Joining League!");
      });
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      console.log(this.props.auth); //this.props.history.push("/dashboard");
    }
    axios
      .get("/api/leagues/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          league: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from League");
      });
  }

  render() {
    const league = this.state.league;
    let LeagueItem = (
      <div>
        <h2>You Have been INvited to a league</h2>
        <table>
          <tbody>
            <tr>
              <th scope="row">2</th>
              <td>owner</td>
              <td>{league.owner}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Published Date</td>
              <td>{league.date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return (
      <div className="">
        <h1>{league.name}</h1>

        <div>{LeagueItem}</div>
        <button onClick={this.onJoinClick} className="">
          Join League
        </button>
      </div>
    );
  }
}
Invite.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Invite);
