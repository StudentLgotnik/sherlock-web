import React, {Component} from 'react';
import ReactModalLogin from "react-modal-login";
import user from "../../../resources/images/noun_user.svg";
import {UserContext} from "../../../context/user-context";
import styles from "./user.form.module.css";
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class UserForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      loggedIn: null,
      loading: false,
      error: null,
      initialTab: null,
      recoverPasswordSuccess: null,
    };

  }


  async onLogin() {
    console.log('__onLogin__');
    console.log('email: ' + document.querySelector('#email').value);
    console.log('password: ' + document.querySelector('#password').value);

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!email || !password) {
      this.setState({
        error: true
      })
    } else {
      let body = {
        email,
        password
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };

      try {
        this.setState({ loading: true })
        const response = await fetch('/api/users/login', requestOptions);
        if (response.ok) {
          const token = response.headers.get('Authorization');
          const parsedToken = jwt(token);
          cookies.set("token", token, {expires: new Date(parsedToken.exp * 1000)})
          const [name, email] = parsedToken.sub.split(',');
          this.context.setCurrentUser({name, email})
          this.onLoginSuccess('form');
        } else {
          this.onLoginFail('form', true)
        }
      } catch (error) {
        console.log(error);
        this.onLoginFail('form', true)
      }
    }
  }

  async onRegister() {
    console.log('__onRegister__');
    console.log('login: ' + document.querySelector('#login').value);
    console.log('email: ' + document.querySelector('#email').value);
    console.log('password: ' + document.querySelector('#password').value);

    const login = document.querySelector('#login').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!login || !email || !password) {
      this.setState({
        error: true
      })
    } else {
      let body = {
        login,
        email,
        password
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };

      try {
        this.setState({ loading: true })
        const response = await fetch('/api/users/signup', requestOptions);
        if (response.ok) {
          const auth = await fetch('/api/users/login', requestOptions);
          if (auth.ok) {
          const token = auth.headers.get('Authorization');
          cookies.set("token", token)
          const [name, email] = jwt(token).sub.split(',');
          this.context.setCurrentUser({name, email})
          this.onLoginSuccess('form');
          }
        } else {
          this.onLoginFail('form', true)
        }
      } catch (error) {
        console.log(error);
        this.onLoginFail('form', true)
      }
    }
  }

  onRecoverPassword() {
    console.log('__onFotgottenPassword__');
    console.log('email: ' + document.querySelector('#email').value);

    const email = document.querySelector('#email').value;


    if (!email) {
      this.setState({
        error: true,
        recoverPasswordSuccess: false
      })
    } else {
      this.setState({
        error: null,
        recoverPasswordSuccess: true
      });
    }
  }

  openModal(initialTab) {
    this.setState({
      initialTab: initialTab
    }, () => {
      this.setState({
        showModal: true,
      })
    });
  }

  onLoginSuccess(method, response) {
    this.closeModal();
    this.setState({
      loggedIn: method,
      loading: false
    })
  }

  onLoginFail(method, response) {

    this.setState({
      loading: false,
      error: response
    })
  }

  startLoading() {
    this.setState({
      loading: true
    })
  }

  finishLoading() {
    this.setState({
      loading: false
    })
  }

  afterTabsChange() {
    this.setState({
      error: null,
      recoverPasswordSuccess: false,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }

  render() {

    const loggedIn = this.state.loggedIn
      ? <div>
        <p>You are signed in with: {this.state.loggedIn}</p>
      </div>
      : <div>
        <p>You are signed out</p>
      </div>;

    const isLoading = this.state.loading;

    return (
      <div>
        <UserContext.Consumer>
          {context => {
            return <span className={styles.login_txt}>{context.currentUser?.email}</span>
          }}
        </UserContext.Consumer>
        <img src={user} alt="user-icon" width="20" height="20" className={styles.login_img}/>
        <UserContext.Consumer>
          {context => {
            if(context.currentUser === null) {
              return <button className={styles.login_btn}
                           onClick={() => this.openModal('login')}>Log in</button>
            } else {
              return <button className={styles.login_btn}
                           onClick={() => {
                             context.setCurrentUser(null)
                             cookies.remove("token")
                             window.location.reload();
                           }}>Log out</button>
            }
          }}
        </UserContext.Consumer>

        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={isLoading}
          initialTab={this.state.initialTab}
          error={this.state.error}
          tabs={{
            afterChange: this.afterTabsChange.bind(this)
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            onRecoverPassword: this.onRecoverPassword.bind(this),

            recoverPasswordSuccessLabel: this.state.recoverPasswordSuccess
              ? {
                label: "New password has been sent to your mailbox!"
              }
              : null,
            loginBtn: {
              label: "Sign in"
            },
            registerBtn: {
              label: "Sign up"
            },
            recoverPasswordBtn: {
              label: "Send new password"
            },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            registerInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Nickname',
                type: 'text',
                inputClass: 'RML-form-control',
                id: 'login',
                name: 'login',
                placeholder: 'Nickname',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
              {
                containerClass: 'RML-form-group',
                label: 'Password',
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: 'Password',
              }
            ],
            recoverPasswordInputs: [
              {
                containerClass: 'RML-form-group',
                label: 'Email',
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: 'Email',
              },
            ],
          }}
        />
      </div>
    )
  }
}

UserForm.contextType = UserContext;

export default UserForm;
