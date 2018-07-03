import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

let baseUrl = "https://practiceapi.devmountain.com/api"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    let promise = axios.get(baseUrl + "/posts");
    promise.then( (response) => {
      this.setState({
        posts : response.data
      });
    });
  }

  updatePost(id, text) {
    let promise = axios.put(`${baseUrl}/posts/?id=${id}`, {text});
    promise.then( (response) => {
      this.setState({
        posts : response.data
      });
    });
  }

  deletePost(id) {
    let promise = axios.delete(`${baseUrl}/posts/?id=${id}`);
    promise.then( (response) => {
      this.setState({
        post : response.data
      });
    });
  }

  createPost(text) {
    let promise = axios.post(`${baseUrl}/posts/`, {text});
    promise.then( (response) => {
      this.setState({
        post : response.data
      });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
            createPostFn={ this.createPost }
          />

          {
            posts.map( post => (
              <Post 
                key={ post.id } 
                id={ post.id }
                text={ post.text }
                date={ post.date }
                updatePostFn={ this.updatePost }
                deletePostFn={ this.deletePost }
              />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
