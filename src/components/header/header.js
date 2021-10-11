import React, {Component} from 'react';
import {
  Link
} from "react-router-dom";
import styles from './header.module.css';
import logo from '../../resources/images/sherlock_logo.svg'
import {UserContext} from "../../context/user-context";
import UserForm from "./user-form/user.form";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Header extends Component {

  componentDidMount() {
    const token = cookies.get("token")
    if (token) {
      const [name, email] = jwt(token).sub.split(',');
      this.context.setCurrentUser({name, email})
    }
  }

  render() {
    return (
      <header fluid className={styles.navbarcontainer}>
        <div className={styles.logocol}>
          <Link to="">
            <img src={logo} alt="companay-logo" width="240" height="60"/>
          </Link>
        </div>
        <div className={styles.navlist}>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
          </ul>
        </div>
        <div className={styles.login_container} >
          <UserForm/>
        </div>

      </header>
    );
  }
}

Header.contextType = UserContext;

export default Header;