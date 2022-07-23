import React, { Component } from 'react'
import styles from './mystyle.module.css'

class Searchbar extends Component{
    state={
        input:''
    }
    submitHandler=(e)=>{
        e.preventDefault()
        let input = this.state.input
        this.props.getSongs(input)
        this.props.redoPlaylistFetch()
    }
    handleInput=(e)=>{
        this.setState({input: e.target.value});
    }

    render(){
        return(
            <form onSubmit={this.submitHandler} className={styles.searchbar}>
                <label htmlFor="search"></label>
                <input type="text" placeholder="Search Song.."value={this.state.input} onChange={this.handleInput}></input>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Searchbar