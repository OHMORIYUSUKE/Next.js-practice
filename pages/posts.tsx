import { NextPage } from 'next';

import axios from 'axios';

import React, { useState,useEffect } from 'react';

const Posts: NextPage = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        (async () => {
          try {
            const res = await axios.get('http://localhost:8000/api/v1/member');
            setPosts(res.data);
          } catch (err) {
            console.log(err);
          }
        })();
    }, []);

    console.log(posts);
  
  return (
    <>
      <h1>posts</h1>
      {posts.map((post,idx_i) => (
          <>
            <p>{post['name']} </p>
            <p>{post['CV']}</p>
            <p>{post['description']}</p>
            <p>{post['groups']}</p>
            <p>{post['grade']}</p>
            <p>{post['birthday']}</p>
            <p>{post['bloodType']}</p>
            <p>{post['height']}</p>
            <p>{post['B']}</p>
            <p>{post['W']}</p>
            <p>{post['H']}</p>
            <img src={post['image']} alt="" style={{width: "50px"}}/>
          </>
          ))}
    </>
  );
};

export default Posts;
