import React, { Component } from 'react';
import './App.css';
import FollowersCard from './components/FollowersCard'
import UserCard from './components/UserCard'
import axios from 'axios'
import 'github-calendar/dist/github-calendar-responsive.css'
import GitHubCalendar from 'github-calendar'


class App extends Component {
  constructor() {
    super();
    this.state = {
      username:'ksemenza',
      user:[],
      followers:[],
      lookupMessage:''
    }
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/${this.state.username}`)
    .then(res => {
      // console.log(res)
      this.setState({...this.state, user: res.data})
    })
    .catch(err => console.error(err));

      axios.get(`https://api.github.com/users/${this.state.username}/followers`)
      .then(res => {
        // console.log(res)
        this.setState({...this.state, followers: res.data})
      })
      .catch(err =>
        console.error(err));
   }

   componentDidUpdate(prevProp, prevState) {
     if(prevState.username !== this.state.username) {
      //  console.log('CDU');
       axios.get(`https://api.github.com/users/${this.state.username}`)
       .then(res => {
        //  console.log(res)
         this.setState({...this.state, user: res.data})
       })
       .catch(err => {
         console.log(err)
         this.setState({...this.state, lookupMessage:`No user found please check username`});
       })
       
       axios.get(`https://api.github.com/users/${this.state.username}/followers`)
       .then(res => {
        //  console.log(res)
         this.setState({...this.state, followers:res.data})
       })
       .catch(err => {
         console.error(err); 
       })
     }
   }
   submitUser = (e) => {
     let userSubmit = e.target.newUser.value;
    //  console.log(`submitUser `)
    //  console.log(userSubmit)
     this.setState({...this.state, username: userSubmit});
   }

render() {
  GitHubCalendar(".calendar",this.state.username, { responsive: true });

  return(
    <div className='App'>
      <header className='app-header'>
        <h1>GitHub Users</h1>
      </header>

      <form onSubmit={this.submitUser}>
        <label htmlFor='newUser'>Get GitHub User</label>
        <input type='text' name='newUser' id='newUser' placeholder='github username'/>
        <button type='submit'>Get User</button>
       </form>
  <p>{this.state.lookupMessage}</p>
  <UserCard user={this.state.user} />
  <div className='calendar'>

</div>
  <h1 className='subheading'>Followers</h1>
  {this.state.followers.map(follower => {

    return (

      <div>
      <FollowersCard user={follower} key={follower.id} login={follower.login}/>
 
          </div>


 
    )
    
    
  })}

    </div>
  )
}
}

export default App;