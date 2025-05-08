import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { taskAPI } from "@/services/operations/taskAPI";

// Task state interface
interface Task {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: 'Pending' | 'Completed';
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskResponse {
  tasks: Task[];
  task?: Task;
  message?: string;
}

// Initial state
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async Thunks

// Get all tasks for a user
export const getTasksAction = createAsyncThunk(
  "tasks/getTasks",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await taskAPI.getTasks(userId);
      return response.tasks; // Return tasks to be added to state
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch tasks");
    }
  }
);

// Create a new task
export const createTaskAction = createAsyncThunk(
  "tasks/createTask",
  async (taskData: Omit<Task, "_id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
    try {
      const response = await taskAPI.createTask(taskData);
      return response.task; // Return the created task
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to create task");
    }
  }
);

// Update a task
export const updateTaskAction = createAsyncThunk(
  "tasks/updateTask",
  async (task: { taskId: string; updatedData: Partial<Task> }, { rejectWithValue }) => {
    try {
      const response = await taskAPI.updateTask(task.taskId, task.updatedData);
      return response.task; // Return updated task
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update task");
    }
  }
);

// Delete a task
export const deleteTaskAction = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await taskAPI.deleteTask(taskId);
      return taskId; // Return taskId to remove from state
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to delete task");
    }
  }
);

// Task slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get tasks
      .addCase(getTasksAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasksAction.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create task
      .addCase(createTaskAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskAction.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update task
      .addCase(updateTaskAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete task
      .addCase(deleteTaskAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskAction.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const {} = taskSlice.actions;
export default taskSlice.reducer;
