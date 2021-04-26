import Head from 'next/head'
import React, { useState,useEffect } from 'react';
import PostCard from '../components/PostCard';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Header from '../components/Header';

import axios from 'axios';
import Router from 'next/router';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
    }
  }),
);

export default function Home() {
  const [posted, setPosted] = React.useState('');
  const [posts, setPosts] = useState([]);
    useEffect(() => {
        (async () => {
          try {
            const res = await axios.get('http://localhost:8000/api/v1/post');
            setPosts(res.data.reverse());
            console.log(posted);
          } catch (err) {
            console.log(err);
          }
        })();
    }, [posted]);

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function submit(): void {
    handleClose();
    const inputElementContent = document.getElementById(
        'content'
    ) as HTMLInputElement;
    const inputValueContent = inputElementContent.value;

    const auth_token = localStorage.getItem('Token');

    // laravel側に投稿をPOSTする---------------------------------------------------
    axios
    .post(
      'http://localhost:8000/api/v1/post',
      {
        content: inputValueContent,
      },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      console.log(res);
      //Router.reload();
      const date = new Date();
      setPosted('posted'+date.getMilliseconds());
      window.alert('投稿が完了しました。');
    })
    .catch((error) => {
      console.log('Error : ' + JSON.stringify(error));
      window.alert('投稿に失敗しました。');
      Router.push('/');
    });
  }

  return (
    <>
      <Header />
      <Grid container justify="center">
        <Grid item md={6} >
          {posts.map((post,idx_i) => (
            <PostCard
              id={post['id']}
              name={post['name']}
              user_id={post['u_id']}
              post_id={post['id']}
              content={post['content']}
              created_at={post['created_at']}
              icon_url={post['icon_url']}
            />
          ))}
        </Grid>
      </Grid>
      {/* 投稿ボタン */}
      <Tooltip title="投稿" aria-label="投稿" onClick={handleClickOpen}>
        <Fab color="primary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{"投稿内容を入力"}</DialogTitle>
        <DialogContent>
            <TextareaAutosize id='content' aria-label="minimum height" rowsMin={15} style={{minWidth: '500px',fontSize: 'large'}} placeholder="いま、なにをしてる？" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            閉じる
          </Button>
          <Button onClick={submit} color="primary" autoFocus>
            投稿
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
