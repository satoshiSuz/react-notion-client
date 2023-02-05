import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import notionLogo from '../assets/images/notion-logo.png';
import { setUser } from '../redux/features/userSlice';
import { useAppDispatch } from '../redux/hooks';
import { RUserType } from '../types/redux';
import { authUtils } from '../utils/authUtils';
import { Sidebar } from './common/Sidebar';
export const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    //JWTを持っているのか確認する
    const checkAuth = async () => {
      //認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        //ユーザーを保存する
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};
