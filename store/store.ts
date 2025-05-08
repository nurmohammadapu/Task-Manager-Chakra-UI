import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./features/tasks/tasksSlice"
import filtersReducer from "./features/filters/filtersSlice"
import authReducer from "./features/auth/authSlice"
import { useDispatch } from "react-redux"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
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
