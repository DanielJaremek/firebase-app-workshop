import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {database, auth} from './firebase'

class App extends Component {
  state = {
    email: '',
    password: '',
    isLoggedIn: false,
    userData: ''
  }

  emailHandler = (event) => {
    this.setState({
      email: event.target.value
    })
  }


  passwordHandler = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  login = () => {
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('LOGGED IN')

        })
        .catch(console.log)
  }

  logout = () => {
    auth.signOut()
        .then(() => {
          console.log('LOGGED OUT')
        })
        .catch(console.log)
  }

  componentWillMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn: true
        })
        database.ref(`usersData/${auth.currentUser.uid}/data`).on('value', (snapshot) => {
          this.setState({
            userData: JSON.stringify(snapshot.val())
          })

        })
      } else {
        this.setState({
          isLoggedIn: false
        })
      }
    })
  }

  render() {
    const app = <div>{this.state.userData || null}
      <button onClick={this.logout}>LogOUT</button>
    </div>
    const loginForm = <div>
      <input type="text" onChange={this.emailHandler} value={this.state.email}/>
      <input type="password" onChange={this.passwordHandler} value={this.state.password}/>

      <button onClick={this.login}>Login</button>

    </div>

    return (
        this.state.isLoggedIn ? app : loginForm

    )
  }
}

export default App;
