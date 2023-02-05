import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useEffect, useState } from 'react';
import Picker from '@emoji-mart/react';
import { emoji } from '../../types/emoji';

type icon = {
  icon: string;
  onChange: (emoji: string) => void;
};

export const EmojiPicker: FC<icon> = (props) => {
  const { icon, onChange } = props;
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const [isShowPicker, setIsShowPicker] = useState<Boolean>(false);
  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e: emoji) => {
    // console.log(e);
    const emojiCode = e.unified.split('-')[0];
    console.log(emojiCode);
    let codesArray = [];
    codesArray.push(Number('0x' + emojiCode));
    const emoji = String.fromCodePoint(...codesArray);
    console.log(emoji);
    setIsShowPicker(false);
    onChange(emoji);
  };

  return (
    <Box>
      <Typography
        variant='h3'
        fontWeight='700'
        sx={{ cursor: 'pointer' }}
        onClick={showPicker}
      >
        {icon}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? 'block' : 'none',
          position: 'absolute',
          zIndex: '100',
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};
