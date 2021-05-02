import React, { useState,useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';

import ReplyIcon from '@material-ui/icons/Reply';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import axios from 'axios';

// indexページとpost詳細ページのtop用

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 600,
      margin: 15,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
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
    },
  }),
);

type Props = {
  id: number;
  user_id: string;
  name: string;
  icon_url: string;
  post_id: string;
  content: string;
  created_at: string;
  };

const PostCard: React.FC<Props> = (props) => {
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
      'http://localhost:8000/api/v1/post/reply',
      {
        idToken: auth_token,
        content: inputValueContent,
        reply_id: props.id,
      }
    )
    .then((res) => {
      console.log(res);
      window.alert('投稿が完了しました。');
    })
    .catch((error) => {
      console.log('Error : ' + JSON.stringify(error));
      window.alert('投稿に失敗しました。');
    });
  }

    return (
      <>
      <Card className={classes.root}>
      <CardHeader
        avatar={
            <Avatar className={classes.avatar} src={props.icon_url} />
        }
        title={props.name}
        subheader={props.created_at}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.content}
        </Typography>
      </CardContent>
      </Card>
    </>
    );
};

export default PostCard;
