import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
/**
 * Create draft vs update draft should be about the same
 */

class League extends Component {
  constructor(props) {
    super(props);
    this.state = {
      league: {},
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get("/api/leagues/" + this.props.match.params.id)
      .then((res) => {
        // console.log("Print-showBookDetails-API-response: " + res.data);
        this.setState({
          league: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from League");
      });
  }

  onDeleteClick(id) {
    axios
      .delete("/api/leagues/" + id)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("Error form League Deletion");
      });
  }

  render() {
    const league = this.state.league;
    let LeagueItem = (
      <div>
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
        <Link to="/">Show League List</Link>

        <h1>{league.name}</h1>

        <div>{LeagueItem}</div>

        <button
          type="button"
          onClick={this.onDeleteClick.bind(this, league._id)}
        >
          Delete League
        </button>
        <p>Invite Link: {window.location.href}/invite</p>

        <Link to={`/draft-settings/${this.state.league.drafts}`}>
          Draft Settings
        </Link>
        <Link to={`/draft/${this.state.league.drafts}`}>Draft</Link>
      </div>
    );
  }
}

export default League;
