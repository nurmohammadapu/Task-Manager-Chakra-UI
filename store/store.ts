import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./features/tasks/tasksSlice"
import authReducer from "./features/auth/authSlice"
import { useDispatch } from "react-redux"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
