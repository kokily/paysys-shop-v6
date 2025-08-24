import type { ChangePasswordPayload, ListUsersParams, SetAdminPayload } from '../../types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { changePassword, listUsers, readUser, removeUser, setAdmin } from '../services/userService';

export const listUsersAsync = createAsyncThunk(
  'user/list',
  async (params: ListUsersParams, { rejectWithValue }) => {
    try {
      return await listUsers(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '사용자 리스트 조회 실패');
    }
  }
);

export const loadMoreUsersAsync = createAsyncThunk(
  'user/loadMore',
  async (params: ListUsersParams, { rejectWithValue }) => {
    try {
      return await listUsers(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '사용자 리스트 추가 조회 실패');
    }
  }
);

export const readUserAsync = createAsyncThunk('user/read', async (id: string, { rejectWithValue }) => {
  try {
    return await readUser(id);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '사용자 상세조회 실패');
  }
});

export const removeUserAsync = createAsyncThunk('user/remove', async (id: string, { rejectWithValue }) => {
  try {
    const result = await removeUser(id);
    return {
      id,
      message: result.message,
    };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : '사용자 삭제 실패');
  }
});

export const setAdminAsync = createAsyncThunk(
  'user/setAdmin',
  async (payload: SetAdminPayload, { rejectWithValue }) => {
    try {
      const result = await setAdmin(payload);
      return {
        id: payload.id,
        isAdmin: payload.isAdmin,
        message: result.message,
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '사용자 권한 설정 실패');
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  'user/changePassword',
  async (payload: ChangePasswordPayload, { rejectWithValue }) => {
    try {
      return await changePassword(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '비밀번호 변경 실패');
    }
  }
);
