import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from './Login'
import Playlistmaker from './Playlistmaker'
import Profile from './Profile'
import Navbar from './Navbar'
import styles from './mystyle.module.css'


class App extends Component{
  state={
    loggedInUser: "",
    loggedInUsername: "",
    userLogged: false
  }
  setLoggedInUser = (userObj) => {
    this.setState({loggedInUser: userObj})
    this.setState({userLogged: userObj.username})
    this.setState({loggedInUsername: userObj.username})
  }
  logOut = () => {
    this.setState({userLogged: false})
  }
  render(){
    return(
      <Router>
      <div className={styles.app}>
        <Navbar logOut={this.logOut} userLogged={this.state.userLogged} loggedInUser={this.state.loggedInUser} loggedInUsername={this.state.loggedInUsername}/>
        <Route exact path="/"><Redirect to="/login" /></Route>
        <Route exact path='/profile' render={() => <Profile loggedInUser={this.state.loggedInUser} />}/>
        <Route exact path='/playlistmaker' render={() => <Playlistmaker loggedInUser={this.state.loggedInUser}/>}/>
        <Route exact path='/login' render={() => <Login setLoggedInUser={this.setLoggedInUser}/>}/>
      </div>
      </Router>
    )
  }
}

export default App;
