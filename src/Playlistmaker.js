import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import styles from './mystyle.module.css'
import Searchbar from './Searchbar'
import Songcard from './Songcard'
import Playlists from './Playlists'

class Playlistmaker extends Component{
    state={
        songs:[],
        NewPlaylist:[],
        playlistname:"",
        nextClicked: false,
        playlistID:"",
       songID:"",
       playlistfromBackend:null,
       isClicked:false
    }
    getSongs =(input) =>{
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
    playlistNametoBackend=(e)=>{
        if(this.state.playlistID === ""){
            let playlistFrontend = this.state.playlistname
        fetch("http://localhost:3000/playlists",{
            method: "POST",
            headers: {
                "content-type":"application/json",
                    Accept: "application/json"
            },
            body: JSON.stringify({
                name:playlistFrontend
            })
        })
        .then(resp=>resp.json())
        .then(data => this.setState({playlistID:data.id}))
        }
        else{
            e.preventDefault()
        }
    }
    createPlaylist=(e)=>{
        e.preventDefault()
        if (this.state.playlistname.length < 3){
            alert("Please enter a name for your playlist. Name must be at least 3 characters in length.")
        }else{
            this.setState({ nextClicked: true })
        }
        this.playlistNametoBackend(e)
    }
    handleChange=(e)=>{
        this.setState({playlistname:e.target.value})
    }
    redoPlaylistFetch=()=>{
        this.fetchPlaylist()
    }
    fetchPlaylist=()=>{
        let currentPlaylistID= this.state.playlistID
        console.log(currentPlaylistID)
        fetch(`http://localhost:3000/playlists/${currentPlaylistID}`)
        .then(resp =>resp.json())
        .then(data=> this.setPlaylist(data))
    }
    setClick=()=>{
        this.setState({isClicked:true})
    }
    setPlaylist=(data)=>{
        this.setState({playlistfromBackend:data})
    }
    // componentDidUpdate(prevState){
    //     if(prevState.playlistfromBackend!==this.state.playlistfromBackend){
    //         this.setPlaylist(this.state.playlistfromBackend)
    //     }
    // }
    render(){
        return(
            <div>
                <div>
                {/* <h1 className={styles.headingstyle}>Playlistmaker</h1> */}
                <h1 className={styles.headingstyle}>MAKE-IT!</h1>
                { this.state.nextClicked ? <h3 className={styles.headingstyle}>{this.state.playlistname}</h3> :
                <form onSubmit={this.createPlaylist}>
                    <label>Playlist Name</label>
                    <input onChange={this.handleChange} type="text" value={this.state.playlistname} placeholder="enter name???"></input>
                     <input type="submit" value="ENTER"></input> 
                </form>
                }
               {(this.state.nextClicked===false? null: <Searchbar getSongs={this.getSongs} redoPlaylistFetch={this.redoPlaylistFetch}/>)} 
               <div className={styles.songdisplay}>
                { (this.state.songs === "" ? null : this.state.songs.map(song=> { 
             return <Songcard key={song.id} song={song} loggedInUser={this.props.loggedInUser} playlistID={this.state.playlistID} redoPlaylistFetch={this.redoPlaylistFetch} setClick={this.setClick}/>
                }))}
                </div>
                </div>
                <div>
                    <Playlists name={this.state.playlistname} playlistfromBackend={this.state.playlistfromBackend} isClicked={this.state.isClicked}/>
                </div>
    
            </div>
            
        )
     }
}

export default Playlistmaker

