import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {database, auth, googleProvider} from './firebase'

class App extends Component {
  state = {
    email: '',
    password: '',
    isLoggedIn: false,
    userData: ''
  }

  login = () => {
    auth.signInWithPopup(googleProvider)
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
    const app = <div>
      {this.state.userData}
      <button onClick={this.logout}>LogOUT</button>
    </div>
    const loginForm = <div>

      <button onClick={this.login}>Login with Google</button>

    </div>

    return (
        this.state.isLoggedIn ? app : loginForm

    )
  }
}

export default App;
