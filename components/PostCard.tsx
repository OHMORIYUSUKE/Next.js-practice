import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';

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
  }),
);

type Props = {
  user_id: string;
  name: string;
  icon_url: string;
  post_id: string;
  content: string;
  created_at: string;
  };

const PostCard: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
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
    );
};

export default PostCard;
