import React, { Component } from "react"
import 'github-calendar/dist/github-calendar-responsive.css'
import GitHubCalendar from 'github-calendar'

class UserCard extends Component {
    constructor(props) {
        super(props)
    
    }
    
    render() {
   
            return(
            <div className='card'>
 
                <div className='img-cta'>
                <div className='username-img-wrap'>
                {this.props.user.company? <h4>{this.props.user.company}</h4> : null}
                    <img className='profile-pic' src={this.props.user.avatar_url} alt='User Pic' />
                        <h3>{this.props.user.login}</h3>
                        <a href={this.props.user.html_url}>{this.props.user.html_url}</a>
                        </div>
                        <div className='follow-wrap'>
                
                        {this.props.user.followers? <p>Followers: {this.props.user.followers}</p> : null}
                        {this.props.user.following? <p>Following: {this.props.user.following}</p> : null}
                        </div>
                        <div className='card-content'>
                        {this.props.user.name? <h2>{this.props.user.name}</h2> : null}
                        {this.props.user.bio? <p className='bio-info'>{this.props.user.bio}</p> : null}
                        <a href={this.props.user.blog}>{this.props.user.blog}</a>
    
    

                        {this.props.user.email? <p>{this.props.user.email}</p>: null}  
                        <p>{this.props.user.hireable? 'Hireable: yes': null}</p>

                        
         </div>
                </div>
       
      
                <div>
          
          </div>
            </div>
        )
    }

}

export default UserCard