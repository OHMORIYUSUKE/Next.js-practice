import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';

import dynamic from 'next/dynamic';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function MenuAppBar() {
  const DynamicComponentUserIcon = dynamic(():any =>
    import('./UserIcon').then((mod):any => mod.UserIcon)
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href='/'>
            <p>5チャンネル</p>
          </IconButton>
          <Grid container justify="flex-end">
              <DynamicComponentUserIcon />
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
