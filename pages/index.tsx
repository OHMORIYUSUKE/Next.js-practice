import Head from 'next/head'
import React, { useState,useEffect } from 'react';
import PostCard from '../components/PostCard';
import { Grid } from '@material-ui/core';

import Header from '../components/Header';

import axios from 'axios';

import NewPost from '../components/NewPost';

export default function Home() {
  const [posts, setPosts] = useState([]);
    useEffect(() => {
        (async () => {
          try {
            const res = await axios.get('http://localhost:8000/api/v1/post');
            setPosts(res.data.reverse());
          } catch (err) {
            console.log(err);
          }
        })();
    }, []);
  return (
    <>
      <Header />
      <Grid container justify="center">
        <Grid item md={6} >
          {posts.map((post,idx_i) => (
            <PostCard
              user_id={post['u_id']}
              name={post['name']}
              post_id={post['id']}
              content={post['content']}
              created_at={post['created_at']}
              icon_url={post['icon_url']}
            />
          ))}
        </Grid>
      </Grid>
      <NewPost />
    </>
  )
}
