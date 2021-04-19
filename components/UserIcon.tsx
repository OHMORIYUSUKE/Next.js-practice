import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import React from 'react';

import Router from 'next/router';

import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '../utils/firebaseConfig';

import axios from 'axios';

// ログイン処理を行う

export function UserIcon() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function login(): void {
        handleClose();
        // 初期化は一度だけ(!!重要!!)
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
    
        // 認証処理
        // signInWithPopupメソッドを叩くと、認証用のポップアップ画面が表示される。
        // それにTwitterのIDとパスワードを入力すると、コールバックをfirebase側が処理し、
        // 認証成功時はPromise型で認証情報を返す
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential as firebase.auth.OAuthCredential;
    
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
            const token = credential.accessToken;
            console.log('token:' + token);
            const secret = credential.secret;
            console.log('secret:' + secret);
            console.log(result);
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // userNameはtwitterのユーザー名(bodyに入れてサーバーに送信)
            const userName = user!.displayName;
            console.log(userName);
            // ローカルストレージにuserNameを保存
            localStorage.setItem('userName', userName!);
    
            // refreshTokenはトークンを再発行させるために使う
            const refreshToken = user!.refreshToken;
            console.log('refreshToken : ' + refreshToken);
            // ローカルストレージにrefreshTokenを保存
            localStorage.setItem('refreshToken', refreshToken);
    
            // userIconImageはtwitterのアイコン画像(サーバーに送信しない)
            const userIconImage = user!.photoURL;
            console.log(userIconImage);
            // ローカルストレージにuserIconImageの画像パスを保存
            localStorage.setItem('userIconImage', userIconImage!);
            firebase
                .auth()
                .currentUser!.getIdToken(/* forceRefresh */ true)
                .then(function (idToken):any {
                    // idTokenをheadsに入れてサーバーに送信
                    // idTokenはローカルストレージに保存する
                    console.log(idToken);
                    //ローカルストレージにTokenを保存
                    localStorage.setItem('Token', idToken);

                    // laravelにログイン処理をさせる-------------------------------------------------------
                    axios
                    .post(
                        'http://localhost:8000/api/v1/user',
                        {
                            name: userName,
                        },
                        {
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            'Content-Type': 'application/json',
                        },
                        }
                    )
                    .then((res:any) => {
                        console.log(res);
                        console.log('新規ユーザーです。');
                        window.alert('ログインしました。');
                        Router.push('/');
                    })
                    .catch((error:any) => {
                        console.log('Error : ' + JSON.stringify(error));
                        window.alert('ログインに失敗しました。');
                    });
                    Router.push('/');
                })
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            const email = error.email;
            console.log(email);
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            console.log(credential);
            // ...
          });
      }
    
      function logout():void {
        localStorage.removeItem('userIconImage');
        localStorage.removeItem('Token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userName');
        handleClose();
      }    

    const userIconImage = localStorage.getItem('userIconImage');
    if(userIconImage){
        return (
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <Avatar src={userIconImage!} />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logout}>ログアウト</MenuItem>
                </Menu>
            </div>
        )
    }else{
        return (
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <Avatar src='' />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={login}>ログイン</MenuItem>
                </Menu>
            </div>
        )
    }
  }