import React, { Component } from 'react'
import styles from './mystyle.module.css'


class Songcard extends Component{
    state = {
        loggedInUser: this.props.loggedInUser,
        songID:"",
        favoriteID:""
    }
    clickHandler=(e)=>{
        this.addtoPlaylistBackend()
        this.props.redoPlaylistFetch()
        this.props.setClick()
        this.createUserPlaylistRelationship(e)
    }
    addtoPlaylistBackend = () => {
        let songObj = this.props.song
        fetch("http://localhost:3000/songs", {
            method: "POST",
            headers: {
                "content-type":"application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                cover:songObj.album.cover,
                title:songObj.title,
                artist:songObj.artist.name,
                preview:songObj.preview
            })
        })
        .then(resp => resp.json())
        .then(data => {this.setState({songID:data.id})
        fetch("http://localhost:3000/favorites",{
            method: "POST",
            headers: {
                "content-type":"application/json",
                    Accept: "application/json"
            },
            body: JSON.stringify({
                song_id: this.state.songID,
                playlist_id: this.props.playlistID
            })
        })
        .then(resp=>resp.json())
        .then(data => this.setState({favoriteID:data.id}))
    })}
    createUserPlaylistRelationship=(e)=>{
        if(e){
        fetch("http://localhost:3000/betweens",{
            method: "POST",
            headers: {
                "content-type":"application/json",
                    Accept: "application/json"
            },
            body: JSON.stringify({
                user_id: this.state.loggedInUser.id,
                playlist_id: this.props.playlistID
            })
        })
        .then(resp=>resp.json())
        .then(data =>console.log(data))
        }
        else{
            e.preventDefault()
        }
    }
    render(){
        console.log(this.state.loggedInUser)
         return(
            <div className={styles.songcard}>
                <img src={this.props.song.album.cover}></img>
                <p><b>Title:</b>{this.props.song.title}</p>
                <p><b>Artist:</b>{this.props.song.artist.name}</p>
                <audio controls>
                    <source src={this.props.song.preview}></source>
                </audio><br/>
                <button onClick={this.clickHandler}>Add to Playlist</button>
            </div>
        )
    }
}

export default Songcard