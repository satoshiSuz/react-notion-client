import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { authApi } from '../api/authApi';

export const Register = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    //新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      localStorage.setItem('token', res.token);
      console.log('新規登録に成功しました');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box component='form' onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id='username'
          label='お名前'
          margin='normal'
          name='username'
          required
        />
        <TextField
          fullWidth
          id='password'
          label='パスワード'
          margin='normal'
          name='password'
          type='password'
          required
        />
        <TextField
          fullWidth
          id='confirmPassword'
          label='確認用パスワード'
          margin='normal'
          name='confirmPassword'
          type='password'
          required
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type='submit'
          loading={false}
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
