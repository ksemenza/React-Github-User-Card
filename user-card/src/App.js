import React, { Component } from "react";
import "./App.css";
import FollowersCard from "./components/FollowersCard";
import UserCard from "./components/UserCard";
import axios from "axios";
import "github-calendar/dist/github-calendar-responsive.css";
import GitHubCalendar from "github-calendar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "ksemenza",
      user: [],
      followers: [],
      lookupMessage: ""
    };
  }

  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.state.username}`)
      .then(res => {
        // console.log(res)
        this.setState({ ...this.state, user: res.data });
      })
      .catch(err => console.error(err));

    axios
      .get(`https://api.github.com/users/${this.state.username}/followers`)
      .then(res => {
        // console.log(res)
        this.setState({ ...this.state, followers: res.data });
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.username !== this.state.username) {
      //  console.log('CDU');
      axios
        .get(`https://api.github.com/users/${this.state.username}`)
        .then(res => {
          //  console.log(res)
          this.setState({ ...this.state, user: res.data });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            ...this.state,
            lookupMessage: `No user found please check username`
          });
        });

      axios
        .get(`https://api.github.com/users/${this.state.username}/followers`)
        .then(res => {
          //  console.log(res)
          this.setState({ ...this.state, followers: res.data });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  submitUser = e => { 
    e.preventDefault()
    let userSubmit = e.target.newUser.value;
    //  console.log(`submitUser `)
    //  console.log(userSubmit)
    this.setState({ ...this.state, username: userSubmit });
  };

  
  refreshPage() {
    window.location.reload(false);
  }
  

  render() {
    GitHubCalendar(".calendar", this.state.username);
console.log(this.state.username)
    return (
      <div className="App">
        <header className="app-header">
          <h1>GitHub Profiles</h1>
        </header>

        <form onSubmit={this.submitUser}>
          <label htmlFor="newUser">Find GitHub</label>
          <input
            type="text"
            name="newUser"
            id="newUser"
            placeholder="username"
          />
          <button type="submit">search</button><button type='reset' onClick={this.refreshPage}>Reset</button>
        </form>
        <p>{this.state.lookupMessage}</p>
        <UserCard user={this.state.user} />
        
        {/* <div className='calendar'> */}
        <img className='calendar'
            src={`http://ghchart.rshah.org/409ba5/${this.state.username}`}
            alt={`${this.state.username}'s Github chart`}
          />

{/* </div> */}
        <h1 className="subheading">Followers</h1>
        {this.state.followers.map(follower => {
          return (
            <div>
              <FollowersCard
                user={follower}
                key={follower.id}
                login={follower.login}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
