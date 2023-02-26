import { AddBoxOutlined } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { memoApi } from '../../api/memoApi';
import { assets } from '../../assets';
import { setMemo } from '../../redux/features/memoSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { memoId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value);
  const memos = useAppSelector((state) => state.memo.value);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (err) {
        // alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    setActiveIndex(memos.findIndex((e) => e._id === memoId));
  }, [navigate]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`/memo/${res._id}`);
    } catch (err) {
      // alert(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List
        sx={{
          width: 250,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItemButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              プライベート
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlined fontSize='small' />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((item, index) => {
          return (
            <ListItemButton
              sx={{ pl: '20px' }}
              component={Link}
              to={`/memo/${item._id}`}
              key={item._id}
              selected={index === activeIndex}
            >
              <Typography variant='body2'>
                {item.icon} {item.title}
              </Typography>
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};
