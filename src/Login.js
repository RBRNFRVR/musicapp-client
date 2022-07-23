import React, { Component } from 'react'
import styles from './mystyle.module.css'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginCard from './LoginCard'

class Login extends Component{
    state = {
        usersArray: "",
        unType: "",
        pwType: "",
        loginAlert: false,
        redirect: false,
        loggedInUser: "",
        songs:[],
        randomInput:''
    }

    handleClick = (e) =>{
        e.preventDefault()
        let user = this.state.unType
        let foundUser = this.state.usersArray.filter(obj => obj.username === user)[0]
        if (foundUser && foundUser.password === this.state.pwType){
            this.setState({ loggedInUser: foundUser })
            this.setState({ redirect: true })
            this.props.setLoggedInUser(foundUser)
        } else {
             this.setState({ loginAlert: true }) 
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/users',{
            method: 'GET',
                headers:{ 
                    'content-type':'application/json',
                 Accept: "application/json",
                }
        })
        .then(resp => resp.json())
        .then(data => this.setState({usersArray: data}) )
        this.getSongs()
    }

    unType = (e) => {
        this.setState({unType: e.target.value})
    }
    pwType = (e) => {
        this.setState({pwType: e.target.value})
    }

    // registerUser = (e) => {
    //     e.preventDefault()
    //     console.log("register user")
    // }
    getSongs =() =>{
        let array= ['Pink Floyd','Drake', 'Justin Bieber','Gus Dapperton','Doja Cat','Billie Eilish','Shakira','XXXTentacion','Paramore', 'J Balvin']
        let input = array[Math.floor(Math.random()*array.length)]
        this.setState({randomInput:input})
        let songapi=`https://deezerdevs-deezer.p.rapidapi.com/search?q=${input}`
        fetch(songapi,{
            method:'GET',
            headers:{
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                'x-rapidapi-key': 'eaffb724e5msh1c243a7968cba7bp18e21bjsn62ea8fd4680b',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => this.setState({songs:data.data}))
    }
    render(){ 
    return( 
        <div>
            <div>
            </div>
            <form className={styles.loginformstyle}>
                 <h1>Login</h1>
                <label className={styles.headingstyle}>Username</label><br/>
                <input onChange={this.unType} value={this.state.unType} type ="text" id="username" name="username" placeholder="e.g.RBRNFRVR"/><br/>
                <br/>
                <label className={styles.headingstyle}>Password</label><br/>
                <input onChange={this.pwType} value={this.state.pwType} type="password" id="password" name="password" placeholder="e.g.Pass12356$"/><br/>
                {!this.state.loginAlert ? null : <p>Incorrect username or password</p>}
                <br/>
                <button onClick={this.handleClick} type="submit" className={styles.loginbutton}>Log In</button>
            </form>
    <h1 className={styles.headingstyle}>Let's Listen to {this.state.randomInput}</h1>
            <div className={styles.mainpage}>
                {this.state.songs.map(song=> { return <LoginCard key={song.id} song={song} />})}
            </div>
            {this.state.redirect ? <Redirect to='/profile'/> : null}
        </div>
    )
    }
}

export default Login