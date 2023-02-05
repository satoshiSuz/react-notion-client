import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RUserType, user } from '../../types/redux';

const initialState: user = {
  value: { username: '', password: '', __v: 0, _id: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<RUserType>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
