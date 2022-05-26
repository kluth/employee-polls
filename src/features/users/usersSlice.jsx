/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import {
  _getUsers as getUsers,
} from '../../_DATA';

const initialState = {
  authedUser: null,
  users: [],
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk('users/login', async ({ username, password }) => {
  // if username and password are valid, return the user and set the authedUser
  // if not, return null
  const users = await getUsers();
  const userList = Object.values(users);
  const currUser = userList.filter((user) => user.id === username && user.password === password)[0];
  if (currUser.password === password) {
    return currUser;
  }
  return null;
});

export const logout = createAsyncThunk('users/logout', async () => ({}));

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const users = await getUsers();
  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.authedUser = action.payload;
      state.status = 'idle';
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.authedUser = null;
      state.status = 'idle';
      state.error = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.authedUser = null;
      state.status = 'idle';
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.authedUser = null;
      state.status = 'idle';
      state.error = action.payload;
    },
    getAllUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.status = 'idle';
      state.error = null;
    },
    getAllUsersFailure: (state, action) => {
      state.users = [];
      state.status = 'idle';
      state.error = action.payload;
    },
    setAuthedUser: (state, action) => {
      state.authedUser = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.authedUser = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },
    [logout.pending]: (state, action) => {
      state.status = 'loading';
    },
    [logout.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.authedUser = null;
    },
    [logout.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },
    [getAllUsers.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.status = 'idle';
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.status = 'idle';
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
