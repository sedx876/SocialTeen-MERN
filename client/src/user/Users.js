import React, { Component } from 'react'
import { list } from './apiUser'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'

class Users extends Component {
  constructor(){
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    list()
    .then(data => {
      if (data.error) {
        console.table(data.error)
    } else {
        this.setState({ users: data })
    }
    })
  }

  renderUsers = users => (
    <div>
			{users.map((user, i) =>(
					<div class="hoverable card pink lighten-1 member-card">
						<div class="card-content black-text">
							<span class="card-title black-text center">{user.name}</span>
							<div className="card-image center">
							<img
        				 style={{ height: "auto", maxWidth: "100%" }}
       					className="img-thumbnail center-align responsive-img"
         				src={`${process.env.REACT_APP_API_URL}/user/photo/${
           			user._id
         				}`}
         				onError={i => (i.target.src = `${DefaultProfile}`)}
         				alt={user.name}
       				/>
							</div>
							<div className="card-body">
         <p>
         <strong>Joined: </strong> 
         {`${new Date(user.created).toDateString()}`}
         </p>
         <Link
           to={`/user/${user._id}`}
           className="btn waves-effect waves-light pink lighten-4 black-text center">
             View Profile
         </Link>
       </div>
						</div>
				</div>
			))}
		</div>
  )

  render() {
    const {users} = this.state
    return (
      <div>
        <h2 className='black-text center'>
          <strong>Members Directory</strong>
        </h2>
        {this.renderUsers(users)}
      </div>
    )
  }
}

export default Users
