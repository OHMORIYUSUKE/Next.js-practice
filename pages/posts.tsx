import { NextPage } from 'next';

import axios from 'axios';

import React, { useState,useEffect } from 'react';
import Router from 'next/router';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const Posts: NextPage = () => {
    const classes = useStyles();
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

    function submit(): void {
      const inputElementName = document.getElementById(
        'name'
      ) as HTMLInputElement;
      const inputValueName = inputElementName.value;
  
      const inputElementCV = document.getElementById(
        'CV'
      ) as HTMLInputElement;
      const inputValueCV = inputElementCV.value;

      const inputElementGroups = document.getElementById(
        'groups'
      ) as HTMLInputElement;
      const inputValueGroups = inputElementGroups.value;

      const inputElementGrade = document.getElementById(
        'grade'
      ) as HTMLInputElement;
      const inputValueGrade = inputElementGrade.value;

      const inputElementBirthday = document.getElementById(
        'birthday'
      ) as HTMLInputElement;
      const inputValueBirthday = inputElementBirthday.value;

      const inputElementBloodType = document.getElementById(
        'bloodType'
      ) as HTMLInputElement;
      const inputValueBloodType = inputElementBloodType.value;

      const inputElementHeight = document.getElementById(
        'height'
      ) as HTMLInputElement;
      const inputValueHeight = inputElementHeight.value;

      const inputElementB = document.getElementById(
        'B'
      ) as HTMLInputElement;
      const inputValueB = inputElementB.value;

      const inputElementW = document.getElementById(
        'W'
      ) as HTMLInputElement;
      const inputValueW = inputElementW.value;

      const inputElementH = document.getElementById(
        'H'
      ) as HTMLInputElement;
      const inputValueH = inputElementH.value;

      const inputElementDescription = document.getElementById(
        'description'
      ) as HTMLInputElement;
      const inputValueDescription = inputElementDescription.value;

      const inputElementImage = document.getElementById(
        'image'
      ) as HTMLInputElement;
      const inputValueImage = inputElementImage.value;
  
      axios
        .post(
          'http://localhost:8000/api/v1/member',
          {
            name: inputValueName,
            CV: inputValueCV,
            groups: inputValueGroups,
            grade: inputValueGrade,
            birthday: inputValueBirthday,
            bloodType: inputValueBloodType,
            height: inputValueHeight,
            B: inputValueB,
            W: inputValueW,
            H: inputValueH,
            description: inputValueDescription,
            image: inputValueImage
          }
        )
        .then((res) => {
          window.alert('投稿が完了しました。');
          Router.push('/posts');
        })
        .catch((error) => {
          console.log(error);
          window.alert('投稿に失敗しました。');
        });
    }
  
  return (
    <>
      <h1>Members</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="name" label="名前" />
        <TextField id="CV" label="声優" />
        <TextField id="groups" label="グループ" />
        <TextField id="grade" label="学年" />
        <TextField id="birthday" label="誕生日" />
        <TextField id="bloodType" label="血液型" />
        <TextField id="height" label="身長" />
        <TextField id="B" label="B" />
        <TextField id="W" label="W" />
        <TextField id="H" label="H" />
        <TextField id="description" label="説明" />
        <TextField id="image" label="画像URL" />
        <br />
        <Button onClick={submit} variant="contained" color="primary">
          送信
        </Button>
      </form>
      {posts.map((post) => (
          <>
            <p>{post['name']} </p>
            <p>{post['CV']}</p>
            <p>{post['description']}</p>
            <p>{post['groups']} {post['grade']}年 {post['birthday']}生まれ {post['bloodType']}型 {post['height']}cm</p>
            <p>B:{post['B']} W:{post['W']} H:{post['H']}</p>
            <img src={post['image']} alt="" style={{width: "200px"}}/>
          </>
          ))}
    </>
  );
};

export default Posts;
