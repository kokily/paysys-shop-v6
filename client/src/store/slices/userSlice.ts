import type { ChangePasswordRequest, SetAdminRequest, UserType } from "@/types/user.types";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { changePassword, listUsers, readUser, removeUser, setAdmin } from "@/services/userService";

interface UserState {
  users: UserType[];
  currentUser: UserType | null;
  loading: boolean;
  error: string | null;
  search: string;
  hasMore: boolean;
  cursor: string | null;
  scrollY: number;
  form: {
    password: string;
    confirmPassword: string;
  };
};

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  search: '',
  hasMore: true,
  cursor: null,
  scrollY: 0,
  form: {
    password: '',
    confirmPassword: '',
  },
};

export const listUsersAsync = createAsyncThunk(
  'user/listUsers',
  async (params: {
    cursor?: string;
    username?: string;
  }, { rejectWithValue }) => {
    try {
      return await listUsers(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '사용자 리스트 조회 실패');
    }
  }
);

export const loadMoreUsersAsync = createAsyncThunk(
  'users/loadMore',
  async (params: {
    cursor?: string;
    username?: string;
  }, { rejectWithValue }) => {
    try {
      return await listUsers(params);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '추가 사용자 로딩 실패');
    }
  }
);

export const readUserAsync = createAsyncThunk(
  'user/readUser',
  async (id: string, { rejectWithValue }) => {
    try {
      return await readUser(id);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '사용자 상세 정보 로딩 실패');
    }
  }
);

export const removeUserAsync = createAsyncThunk(
  'user/removeUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await removeUser(id);
      return {
        id,
        message: result.message,
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '사용자 삭제 실패');
    }
  }
);

export const setAdminAsync = createAsyncThunk(
  'user/setAdmin',
  async (payload: SetAdminRequest, { rejectWithValue }) => {
    try {
      const result = await setAdmin(payload);
      return {
        id: payload.id,
        isAdmin: payload.isAdmin,
        message: result.message,
      };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '관리자 권한 설정 실패');
    }
  }
);

export const changePasswordAsync = createAsyncThunk(
  'user/changePassword',
  async (payload: ChangePasswordRequest, { rejectWithValue }) => {
    try {
      return await changePassword(payload);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : '비밀번호 변경 실패');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
      state.cursor = null;
      state.hasMore = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    updateForm: (state, action: PayloadAction<Partial<{ password: string; confirmPassword: string }>>) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearForm: (state) => {
      state.form = {
        password: '',
        confirmPassword: '',
      };
    },
    setScrollY: (state, action: PayloadAction<number>) => {
      state.scrollY = action.payload;
    },
    clearScrollY: (state) => {
      state.scrollY = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUsersAsync.fulfilled, (state, action: PayloadAction<UserType[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.cursor = action.payload.length > 0
          ? action.payload[action.payload.length - 1].id : null;
        state.hasMore = action.payload.length === 30;
      })
      .addCase(listUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(loadMoreUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreUsersAsync.fulfilled, (state, action: PayloadAction<UserType[]>) => {
        state.loading = false;
        state.users = [...state.users, ...action.payload];
        state.cursor = action.payload.length > 0
          ? action.payload[action.payload.length - 1].id : null;
        state.hasMore = action.payload.length === 30;
      })
      .addCase(loadMoreUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(readUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readUserAsync.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(readUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(removeUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUserAsync.fulfilled, (state, action: PayloadAction<{ id: string; message: string }>) => {
        state.loading = false;
        // 삭제된 사용자 리스트에서 제거
        state.users = state.users.filter(user => user.id !== action.payload.id);
        // 현재 선택된 사용자가 삭제된 경우 null로 설정
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = null;
        }
      })
      .addCase(removeUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(setAdminAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setAdminAsync.fulfilled, (state, action: PayloadAction<{ id: string; isAdmin: boolean; message: string }>) => {
        state.loading = false;
        // 리스트에서 해당 사용자의 Admin 권한 업데이트
        const user = state.users.find(u => u.id === action.payload.id);

        if (user) {
          user.admin = action.payload.isAdmin;
        };

        // 현재 선택된 사용자가 업데이트 된 경우 권한 변경
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser.admin = action.payload.isAdmin;
        };
      })
      .addCase(setAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(changePasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearch,
  clearUsers,
  clearError,
  clearCurrentUser,
  updateForm,
  clearForm,
  setScrollY,
  clearScrollY,
} = userSlice.actions;
export default userSlice.reducer;