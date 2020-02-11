import React, { Component } from 'react'
import axios from 'axios'
import UserCard from './UserCard'

class FollowersCard extends Component {
    constructor() {
        super()
        this.state={
            follower:[]
        }
    }
    
    componentDidMount() {
        axios.get(`https://api.github.com/users/${this.props.user.login}`)
        .then(res => {
            console.log(res)
            this.setState({...this.state, follower: res.data})
        })
        .catch(err => {
            console.error(err); 
        })

    }

    render() {
        return(
            <UserCard user={this.state.follower}/>
        )
    }
}
export default FollowersCard