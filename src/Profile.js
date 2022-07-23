import React, { Component } from 'react'
import styles from './mystyle.module.css'
import ProfileCard from './ProfileCard'

class Profile extends Component{
    state={
        info: "",
        playlistNames: "",
        playlistArray: [],
        filteredSongs :[],
        playlistName: "",
        playlistClicked: false,
        hideButton: true,
        loggedInUser: this.props.loggedInUser
    }
    componentDidMount(){
        let newUrl = `http://localhost:3000/users/${this.state.loggedInUser.id}`
    
        fetch(newUrl)
        .then(resp => resp.json())
        .then(data => {this.setState({info:data}) 
        
            fetch("http://localhost:3000/playlists")
            .then(resp => resp.json())
            .then(data => this.setState({playlistArray: data}) )
        }) 
    }
    componentDidUpdate(prevProp, prevState) {
        if (prevState.info.playlists !== this.state.info.playlists){
            let playlistArray = this.state.info.playlists.map(obj => obj.name)
            let newArray = [...new Set(playlistArray)]
            this.setState({playlistNames: newArray})
        } 
    }
    clickedPlaylist = (name) => {
        
        this.setState({playlistName: name})
        let array = this.state.playlistArray
        let filteredArray = array.filter(obj => obj.name === name)
        let songs = filteredArray.map(obj => obj.songs)
        this.setState({ filteredSongs : songs, playlistClicked: true, hideButton: false })
        console.log(name)
    }

    render(){
        
        // console.log(this.state.filteredSongs)
        console.log(this.state.playlistName)
        return(
            <div>
                <h1 className={styles.headingstyle}>LOVE-IT!</h1>
                <h2 className={styles.headingstyle}>{this.state.info.username}</h2>
                <h2 className={styles.headingstyle}>My Playlists</h2>
                    <div>{(this.state.playlistNames === "" ? null : this.state.playlistNames.map(obj => <div className={styles.list} onClick={() => this.clickedPlaylist(obj)}>{obj}</div>))}</div> 
               
                <div>
                    { (!this.state.playlistClicked ? <h4>Select a playlist from "My Playlists" to view more details</h4> : <div className={styles.headingstyle}> <h3>{this.state.playlistName}</h3><hr></hr><button>Delete Playlist</button></div>)}  
                    { this.state.filteredSongs && this.state.filteredSongs.map(obj => obj.map( item => <ProfileCard  key={item.id} obj={item}/>))} 
                </div>    
            </div>
        )
    }
}

export default Profile