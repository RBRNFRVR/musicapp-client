import React, { Component } from 'react'
import styles from './mystyle.module.css'

class PlaylistsCard extends Component{

    render(){
        console.log(this.props.song)
        return(
            <div className={styles.playlist}>
             <div className={styles.songcard}>
                <img src={this.props.song.cover}></img>
                <p><b>Title:</b>{this.props.song.title}</p>
                <p><b>Artist:</b>{this.props.song.artist}</p>
                <audio controls>
                    <source src={this.props.song.preview}></source>
                </audio><br/>
                <button>Remove from Playlist</button>
                </div>
            </div>
           
        )
    }
}

export default PlaylistsCard