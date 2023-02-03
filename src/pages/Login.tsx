import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useState } from 'react';
import { registerApi } from '../types/registerApi';

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setUsernameErrText('');
    setPasswordErrText('');

    event.preventDefault();
    //入力欄の文字列を取得
    if (!(event.target instanceof HTMLFormElement)) {
      return;
    }
    const data = new FormData(event.target);
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    console.log(username);
    console.log(password);
    let error = false;
    if (username === '') {
      error = true;
      setUsernameErrText('名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrText('パスワードを入力してください');
    }
    if (error) return;

    setLoading(true);
    //新規登録APIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem('token', res.token);
      console.log('ログインに成功しました');
      navigate('/');
    } catch (err) {
      //console.log(err);
      const errors = err as registerApi;
      errors.data.errors.forEach((err) => {
        if (err.param === 'username') {
          setUsernameErrText(err.msg);
        }
        if (err.param === 'password') {
          setPasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  };
  return (
    <>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id='username'
          label='お名前'
          margin='normal'
          name='username'
          required
          helperText={usernameErrText}
          error={usernameErrText !== ''}
        />
        <TextField
          fullWidth
          id='password'
          label='パスワード'
          margin='normal'
          name='password'
          type='password'
          required
          helperText={passwordErrText}
          error={passwordErrText !== ''}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type='submit'
          loading={loading}
          color='primary'
          variant='outlined'
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to='/register'>
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};
