import React, {Component} from 'react';
import {
  Link
} from "react-router-dom";
import styles from './header.module.css';
import logo from '../../resources/images/sherlock_logo.svg'
import user from '../../resources/images/noun_user.svg'
import {UserContext} from "../../context/user-context";
import UserForm from "./user-form/user.form";

class Header extends Component {
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

export default Header;