import React, { Component } from 'react'
import PlaylistsCard from './PlaylistsCard'
import styles from './mystyle.module.css'

class Playlist extends Component{
    // state={
    //     playlistfromBackend:null
    // }
    // componentDidMount(){
    //     if(this.props.playlistID===''){
    //         console.log('not yet')
    //     }
    //     else{
    //     this.fetchPlaylist()
    //     }
    // }
    // fetchPlaylist=()=>{
    //     let currentPlaylistID= this.props.playlistID
    //     fetch(`http://localhost:3000/playlists/${currentPlaylistID}`)
    //     .then(resp =>resp.json())
    //     .then(data=> this.setState({playlistfromBackend:data}))
    // }
    // componentDidUpdate(prevProps){
    //     if(prevProps.playlistfromBackend!==this.props.playlistfromBackend){
            
    //     }
    // }

    render(){
        return(
            <div>
                {(this.props.isClicked===false?null: this.props.playlistfromBackend.songs.map(song=>{
                    return <PlaylistsCard key={song.id} song={song}/>
                }))}
            </div>
        )}}
export default Playlist