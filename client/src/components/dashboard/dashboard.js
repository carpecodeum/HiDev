import React, { Component } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getcurrentprofile } from "../../actions/profileaction";

class Dashboard extends Component {
  componentDidMount(){
    this.props.getcurrentprofile();
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
    const { profile,loading,} = this.props.profile;
    const loadingerror = this.props.errors.loading;
    let dashboardcontent;
    if(loading){
      dashboardcontent = <h4>loading...</h4>
    }else{
      if(Object.keys(profile).length>0){
dashboardcontent = <h4>todo display profile</h4>
      }else{
dashboardcontent = (
 <div> <h4>welcome {user.name} </h4>
 <p>no profile setup</p>
 <Link to="/create-profile" className="btn btn-large waves-effect waves-light hoverable blue accent-3">create profile</Link> 
</div>
)}
    }
return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
                <span style={{ fontFamily: "monospace" }}>{dashboardcontent}</span> 
            </h4>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getcurrentprofile:PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  profile:state.profile,
  auth: state.auth,
  errors:state.errors
});
export default connect(
  mapStateToProps,
  { logoutUser , getcurrentprofile},
)(Dashboard);