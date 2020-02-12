import React, { Component } from 'react'
import axios from 'axios'
import UserCard from './UserCard'
import 'github-calendar/dist/github-calendar-responsive.css'
import GitHubCalendar from 'github-calendar'



class FollowersCard extends Component {
    constructor(props) {
        super(props)
        this.state={
            follower:[]
        
        }


       
    }
    
    componentDidMount() {

        axios.get(`https://api.github.com/users/${this.props.login}`)
        .then(res => {
            
            this.setState({...this.state, follower: res.data})
        })
        .catch(err => {
            console.error(err); 
        })

    }

    
    render() {

        return(
            <div>
    
            <UserCard user={this.state.follower} />
     
                       
   <img className='calendar'
            src={`http://ghchart.rshah.org/${this.state.follower.login}`}
            alt={`${this.props.login}'s Github chart`}
          />
            </div>
      
        )
    }
}
export default FollowersCard