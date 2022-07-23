import React, { Component } from 'react'
import styles from './mystyle.module.css'

class ProfileCard extends Component{
    render(){
        console.log(this.props.obj)
        if(this.props.obj){
        return(
            <div className={styles.songcard}>
                <img src={this.props.obj.cover}></img>
                <p><b>Title:</b>{this.props.obj.title}</p>
                <p><b>Artist:</b>{this.props.obj.artist}</p>
                <audio controls>
                    <source src={this.props.obj.preview}></source>
                </audio><br/>
            </div>
        )
        }else{
           return null
        }
    }
}

export default ProfileCard