import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { taskAPI } from "@/services/operations/taskAPI";

// Task Type
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

interface TaskState {
  tasks: Task[];
  task: Task | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
};

// Async Thunks

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId: string, thunkAPI) => {
  try {
    const response = await taskAPI.getTasks(userId);
    return response.tasks;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchTaskById = createAsyncThunk('tasks/fetchTaskById', async (taskId: string, thunkAPI) => {
  try {
    const response = await taskAPI.getTaskById(taskId);
    return response.task;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const createNewTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>, thunkAPI) => {
    try {
      const response = await taskAPI.createTask(taskData);
      return response.task;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateExistingTask = createAsyncThunk(
  'tasks/updateTask',
  async (
    { taskId, updatedData }: { taskId: string; updatedData: Partial<Omit<Task, '_id' | 'user' | 'createdAt' | 'updatedAt'>> },
    thunkAPI
  ) => {
    try {
      const response = await taskAPI.updateTask(taskId, updatedData);
      return response.task;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteTaskById = createAsyncThunk('tasks/deleteTask', async (taskId: string, thunkAPI) => {
  try {
    await taskAPI.deleteTask(taskId);
    return taskId;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchTasksByCategory = createAsyncThunk(
  'tasks/fetchTasksByCategory',
  async ({ userId, category }: { userId: string; category: string }, thunkAPI) => {
    try {
      const response = await taskAPI.getTasksByCategory(userId, category);
      return response.tasks;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchPendingTasks = createAsyncThunk('tasks/fetchPendingTasks', async (userId: string, thunkAPI) => {
  try {
    const response = await taskAPI.getPendingTasks(userId);
    return response.tasks;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const fetchCompletedTasks = createAsyncThunk('tasks/fetchCompletedTasks', async (userId: string, thunkAPI) => {
  try {
    const response = await taskAPI.getCompletedTasks(userId);
    return response.tasks;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const toggleTaskStatus = createAsyncThunk(
  'tasks/toggleTaskStatus',
  async ({ taskId, status }: { taskId: string; status: 'Pending' | 'Completed' }, thunkAPI) => {
    try {
      const response = await taskAPI.toggleTaskStatus(taskId, status);
      return response.task;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const searchTasks = createAsyncThunk('tasks/searchTasks', async (query: string, thunkAPI) => {
  try {
    const response = await taskAPI.searchTasks(query);
    return response.tasks;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Slice
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTaskState: (state) => {
      state.task = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchTaskById
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action: PayloadAction<Task | undefined>) => {
        state.loading = false;
        state.task = action.payload || null;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createNewTask
      .addCase(createNewTask.fulfilled, (state, action: PayloadAction<Task | undefined>) => {
        if (action.payload) {
          state.tasks.push(action.payload);
        }
      })

      // updateExistingTask
      .addCase(updateExistingTask.fulfilled, (state, action: PayloadAction<Task | undefined>) => {
        const updatedTask = action.payload;
        if (updatedTask) {
          const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
          if (index !== -1) {
            state.tasks[index] = updatedTask;
          }
        }
      })

      // deleteTaskById
      .addCase(deleteTaskById.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })

      // fetchTasksByCategory
      .addCase(fetchTasksByCategory.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })

      // fetchPendingTasks
      .addCase(fetchPendingTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })

      // fetchCompletedTasks
      .addCase(fetchCompletedTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })

      // toggleTaskStatus
      .addCase(toggleTaskStatus.fulfilled, (state, action: PayloadAction<Task | undefined>) => {
        const updatedTask = action.payload;
        if (updatedTask) {
          const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
          if (index !== -1) {
            state.tasks[index] = updatedTask;
          }
        }
      })

      // searchTasks
      .addCase(searchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      });
  },
});

export const { clearTaskState } = taskSlice.actions;
export default taskSlice.reducer;
