import React,{Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearcurrentprofile} from '../../actions/profileaction'

class Navbar extends Component {
  onLogoutClick(e){
    e.preventDefault();
    this.props.clearcurrentprofile();
    this.props.logoutUser();
  }
    render(){
      const {isAuthenticated,user} = this.props.auth;
      const authLinks=(
            <ul id="nav-mobile" className="left hide-on-med-and-down">
           <a href="#" onClick={this.onLogoutClick.bind(this)}>{' '}logout</a>
            </ul>
      );
      const guestLinks=(
            <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            </ul>
       
      );
        return(
          <nav>
            <div className="navbar-fixed">
            <nav className="z-depth-0">
            <div className="nav-wrapper light-blue">
            <Link to="/" className="brand-logo center">HiDEV</Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li><Link to="/developers">Developers</Link></li>
            </ul>
            {isAuthenticated ? authLinks:guestLinks}
            </div>
            </nav>
            </div>
            </nav>
        )
    }
}
Navbar.propTypes= {
logoutUser:PropTypes.func.isRequired,
auth:PropTypes.object.isRequired,
clearcurrentprofile:PropTypes.func.isRequired
}
const mapStateToProps=(state)=>({
  auth:state.auth
})
export default connect(mapStateToProps,{logoutUser,clearcurrentprofile})(Navbar);
 