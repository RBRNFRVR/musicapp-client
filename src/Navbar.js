import React, { Component } from 'react'
import { Link, Switch, withRouter} from "react-router-dom";
import styles from './mystyle.module.css'

class Navbar extends Component{
    state={
        hover:false,
        loggedInUser: this.props.loggedInUser,
        loggedInUsername: this.props.loggedInUsername,
        userLogged: false
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.userLogged !== this.props.userLogged){
            this.setState({userLogged: !this.state.userLogged})
        }
    }
    render(){
        return(
            <div className={styles.navbar}>
               {this.state.userLogged ?
               <>
                <div className={styles.navbarlinks}>
                <Link to='/login' onClick={this.props.logOut} className={styles.linkstyle}>Log Out</Link>
                </div>
                <div className={styles.navbarlinks}>
                <Link to='/playlistmaker' className={styles.linkstyle}>Playlistmaker</Link>
                </div>
                <div className={styles.navbarlinks}>
                <Link to='/profile' className={styles.linkstyle}>Profile</Link>
                </div>
                </>
            :
            null
                }
            </div>
        )
    }
}

export default Navbar