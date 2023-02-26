import { DeleteOutlined, StarBorderOutlined } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { memoApi } from '../api/memoApi';
import { EmojiPicker } from '../components/common/EmojiPicker';
import { setMemo } from '../redux/features/memoSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [icon, setIcon] = useState<string>('');
  const memos = useAppSelector((state) => state.memo.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getMemo = async () => {
      try {
        if (memoId !== undefined) {
          const res = await memoApi.getOne(memoId);
          setTitle(res.title);
          setDescription(res.description);
          setIcon(res.icon);
        }
      } catch (err) {
        // alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer: NodeJS.Timer;
  const timeout = 500;

  const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    const newTitle = e.target.value;
    temp[index] = { ...temp[index], title: newTitle };
    setTitle(newTitle);
    dispatch(setMemo(temp));
    timer = setTimeout(async () => {
      try {
        if (memoId !== undefined) {
          await memoApi.update(memoId, { title: newTitle });
        }
      } catch (err) {
        // alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        if (memoId !== undefined) {
          await memoApi.update(memoId, { description: newDescription });
        }
      } catch (err) {
        // alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      if (memoId !== undefined) {
        const deletedMemo = await memoApi.delete(memoId);
        console.log(deletedMemo);

        const newMemos = memos.filter((e) => e._id !== memoId);
        if (newMemos.length === 0) {
          navigate('/memo');
        } else {
          navigate(`/memo/${newMemos[0]._id}`);
        }

        dispatch(setMemo(newMemos));
      }
    } catch (err) {
      // alert(err);
    }
  };

  const onIconChange = async (newIcon: string) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(temp));
    try {
      if (memoId !== undefined) {
        await memoApi.update(memoId, { icon: newIcon });
      }
    } catch (err) {
      // alert(err);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color='error' onClick={deleteMemo}>
          <DeleteOutlined />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            onChange={updateTitle}
            value={title}
            placeholder='無題'
            variant='outlined'
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' },
            }}
          />
          <TextField
            onChange={updateDescription}
            value={description}
            placeholder='追加'
            variant='outlined'
            fullWidth
            sx={{
              '.MuiOutlinedInput-input': { padding: 0 },
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiOutlinedInput-root': { fontSize: '1rem' },
            }}
          />
        </Box>
      </Box>
    </>
  );
};
