import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useState } from 'react';
import { registerApi } from '../types/registerApi';

export const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmErrText, setConfirmErrText] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmErrText('');

    event.preventDefault();
    //入力欄の文字列を取得
    if (!(event.target instanceof HTMLFormElement)) {
      return;
    }
    const data = new FormData(event.target);
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error = false;
    if (username === '') {
      error = true;
      setUsernameErrText('名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrText('パスワードを入力してください');
    }
    if (confirmPassword === '') {
      error = true;
      setConfirmErrText('確認用パスワードを入力してください');
    }
    if (password !== confirmPassword) {
      error = true;
      setConfirmErrText('パスワードと確認用パスワードが異なります');
    }
    if (error) return;

    setLoading(true);
    //新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem('token', res.token);
      console.log('新規登録に成功しました');
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
        if (err.param === 'confirmPassword') {
          setConfirmErrText(err.msg);
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
        <TextField
          fullWidth
          id='confirmPassword'
          label='確認用パスワード'
          margin='normal'
          name='confirmPassword'
          type='password'
          required
          helperText={confirmErrText}
          error={confirmErrText !== ''}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type='submit'
          loading={loading}
          color='primary'
          variant='outlined'
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to='/login'>
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};
