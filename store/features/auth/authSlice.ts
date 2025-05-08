import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { login, signUp, sendOtp, type LoginData, type SignUpData, type SendOtpData } from "@/services/operations/authAPI"

// User Interface
interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  image: string
}

// Auth State Interface
interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  otpSent: boolean
}

// Utility to fetch token and user from localStorage
const getAuthFromStorage = (): { token: string | null; user: User | null } => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
    return { token, user }
  }
  // Return null values when running server-side
  return { token: null, user: null }
}

// Initial State
const { token, user } = getAuthFromStorage()

const initialState: AuthState = {
  user: user,
  token: token,
  loading: false,
  error: null,
  otpSent: false,
}

// ======= Async Thunks =======

// Send OTP for email verification
export const sendOtpAction = createAsyncThunk(
  "auth/sendOtp",
  async (data: SendOtpData, { rejectWithValue }) => {
    try {
      const response = await sendOtp(data)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "OTP sending failed")
    }
  }
)

// Signup User
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: SignUpData, { rejectWithValue }) => {
    try {
      const response = await signUp(userData)
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed")
    }
  }
)

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginData, { rejectWithValue }) => {
    try {
      const response = await login(credentials)
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
      }
      return response
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed")
    }
  }
)

// Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    // Clear localStorage and reset state
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
    return { success: true }
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Logout failed")
  }
})

// ======= Slice =======

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthFromStorage: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    resetError: (state) => {
      state.error = null
    },
    resetOtpSent: (state) => {
      state.otpSent = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOtpAction.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendOtpAction.fulfilled, (state, action) => {
        state.loading = false
        state.otpSent = true
      })
      .addCase(sendOtpAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Signup User
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

// Export actions and reducer
export const { setAuthFromStorage, resetError, resetOtpSent } = authSlice.actions
export default authSlice.reducer
