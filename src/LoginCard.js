import React, { Component } from 'react'
import styles from './mystyle.module.css'

class LoginCard extends Component{
    render(){
        return(
            <div className={styles.logincard}>
                {/* <img src={this.props.song.album.cover}></img> */}
                <p className={styles.items}>Title: {this.props.song.title}</p>
                <p className={styles.items}>Artist: {this.props.song.artist.name}</p>
                <audio className={styles.audio} controls>
                    <source src={this.props.song.preview}></source>
                </audio>
        
            </div>
        )
    }
}

export default LoginCard