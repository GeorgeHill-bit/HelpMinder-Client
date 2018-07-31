import React, { Component } from 'react';
import Auth from './auth/Auth';
import NavBar from './home/NavBar';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Splash from './home/Splash';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: '',
      userName: ''
    }
  }

  setSessionState = (token, username) => {
    // console.log(username, token);
    localStorage.setItem('userName', username);
    localStorage.setItem('token', token); 
    this.setState({ 
      sessionToken: token,
      userName: username 
    });
  }

  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token && !this.state.sessionToken) {
      // this.setState({ sessionToken: token }); 
    }
  }

  logout = () => {
    console.log('"HelpMinder: User "'+this.state.username+'" logged out.')
    this.setState({
      sessionToken: '',
      userName: ''
    });
    localStorage.clear();
  }

    protectedViews = () => {
    if (this.state.sessionToken === localStorage.getItem('token')) {
      return (
        <Switch>
          <Route path='/' exact>
            <Splash token = {this.state.sessionToken} />
          </Route>
        </Switch>
      )
    } else {
      return (
        <Route path="/auth" >
          <Auth setToken={this.setSessionState}/>
        </Route>
      )
    }
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar 
            logout={this.logout}
            username={this.state.userName}
          />
          {this.protectedViews()}
        </div>
      </Router>

    );
  }
}

export default App;