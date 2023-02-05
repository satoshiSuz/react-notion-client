import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RMemoType } from '../../types/redux';

const initialState: { value: RMemoType[] } = {
  value: [],
};

export const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    setMemo: (state, action: PayloadAction<RMemoType[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setMemo } = memoSlice.actions;
export default memoSlice.reducer;
