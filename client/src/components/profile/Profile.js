import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileCreds from "./ProfileCreds";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileItems;

    if (profile === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profile.length > 0) {
        profileItems = (
          <div>
            <ProfileHeader />
            <ProfileCreds />
            <ProfileGithub />
            <ProfileAbout />
          </div>
        );
      }
    }
    return (
      <div>
        <ProfileHeader />
        <ProfileCreds />
        <ProfileGithub />
        <ProfileAbout />
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
