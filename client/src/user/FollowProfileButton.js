import React, { Component } from "react"
import { follow, unfollow } from "./apiUser"

class FollowProfileButton extends Component {
  followClick = () => {
    this.props.onButtonClick(follow)
  }

    unfollowClick = () => {
        this.props.onButtonClick(unfollow)
    }

  render() {
    return (
      <div className="d-inline-block">
        {!this.props.following ? (
      <button
        style={{margin: '10px'}}
        onClick={this.followClick}
        className="btn waves-effect waves-light pink lighten-4 darkPink center"
      >
        Follow
      </button>
      ) : (
      <button
        style={{margin: '10px'}}
        onClick={this.unfollowClick}
        className="btn waves-effect waves-light pink lighten-4 darkPink center"
      >
        UnFollow
      </button>
      )}
      </div>
    )
  }
}

export default FollowProfileButton