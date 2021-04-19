import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
    }
  }),
);

export default function SimpleTooltips() {
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
      window.alert('投稿が完了しました。');
    })
    .catch((error) => {
      console.log('Error : ' + JSON.stringify(error.response));
      console.log('Error msg : ' + error.response.data.message);
      window.alert('投稿に失敗しました。');
    });
  }

  return (
    <>
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
            <TextareaAutosize id='content' aria-label="minimum height" rowsMin={10} placeholder="いま、なにをしてる？" />
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
  );
}
