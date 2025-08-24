import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChangePasswordPayload, UserType } from '../../types/user.types';
import { createSlice } from '@reduxjs/toolkit';
import {
  changePasswordAsync,
  listUsersAsync,
  loadMoreUsersAsync,
  readUserAsync,
  removeUserAsync,
  setAdminAsync,
} from '../thunks/userThunks';

interface UserState {
  users: UserType[];
  currentUser: UserType | null;
  loading: boolean;
  error: string | null;
  username: string;
  cursor: string | null;
  hasMore: boolean;
  scrollY: number;
  form: {
    password: string;
    confirmPassword: string;
  };
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  username: '',
  cursor: null,
  hasMore: true,
  scrollY: 0,
  form: {
    password: '',
    confirmPassword: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
      state.cursor = null;
      state.hasMore = true;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updatePasswordForm: (
      state,
      action: PayloadAction<Partial<{ password: string; confirmPasword: string }>>
    ) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },
    clearPasswordForm: (state) => {
      state.form = initialState.form;
    },
    setScrollY: (state, action: PayloadAction<number>) => {
      state.scrollY = action.payload;
    },
    clearScrollY: (state) => {
      state.scrollY = 0;
    },
  },
  extraReducers: (builder) => {
    // List Users Action
    builder
      .addCase(listUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUsersAsync.fulfilled, (state, action: PayloadAction<UserType[]>) => {
        const users = action.payload;

        state.loading = false;
        state.users = users;
        state.cursor = users.length > 0 ? users[users.length - 1].id : null;
        state.hasMore = users.length === 30;
      })
      .addCase(listUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Load More Users Action
    builder
      .addCase(loadMoreUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMoreUsersAsync.fulfilled, (state, action: PayloadAction<UserType[]>) => {
        const loadMoreUsers = action.payload;

        state.loading = false;
        state.users = [...state.users, ...loadMoreUsers];
        state.cursor = loadMoreUsers.length > 0 ? loadMoreUsers[loadMoreUsers.length - 1].id : null;
        state.hasMore = loadMoreUsers.length === 30;
      })
      .addCase(loadMoreUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Read User Action
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

    // Remove User Action
    builder
      .addCase(removeUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUserAsync.fulfilled, (state, action: PayloadAction<{ id: string; message: string }>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload.id);

        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = null;
        }
      })
      .addCase(removeUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Set Admin Action
    builder
      .addCase(setAdminAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setAdminAsync.fulfilled,
        (state, action: PayloadAction<{ id: string; isAdmin: boolean; message: string }>) => {
          state.loading = false;

          const user = state.users.find((user) => user.id === action.payload.id);

          if (user) {
            user.admin = action.payload.isAdmin;
          }

          if (state.currentUser?.id === action.payload.id) {
            state.currentUser.admin = action.payload.isAdmin;
          }
        }
      )
      .addCase(setAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Change Password Action
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
  setUsername,
  clearUsers,
  clearCurrentUser,
  clearError,
  updatePasswordForm,
  clearPasswordForm,
  setScrollY,
  clearScrollY,
} = userSlice.actions;
export default userSlice.reducer;
