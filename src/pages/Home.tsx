import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memoApi } from '../api/memoApi';
import { setMemo } from '../redux/features/memoSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const memos = useAppSelector((state) => state.memo.value);

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      console.log(res);
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton
        variant='outlined'
        onClick={() => createMemo()}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};
