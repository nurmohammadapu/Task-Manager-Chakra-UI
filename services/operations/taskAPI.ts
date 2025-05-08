import { apiConnector } from "@/services/apiConnector";

// Get token from localStorage
const getTokenFromLocalStorage = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/v1/tasks';

// Define Task Types
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

// Task API
export const taskAPI = {
  // Get all tasks for a specific user
  getTasks: async (userId: string): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/${userId}`;
    return apiConnector<TaskResponse>({
      method: 'GET',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Get task by ID
  getTaskById: async (taskId: string): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/task/${taskId}`;
    return apiConnector<TaskResponse>({
      method: 'GET',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Create a new task
  createTask: async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}`;
    return apiConnector<TaskResponse>({
      method: 'POST',
      url,
      bodyData: taskData,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Update task by ID
  updateTask: async (taskId: string, updatedData: Partial<Omit<Task, '_id' | 'user' | 'createdAt' | 'updatedAt'>>): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/${taskId}`;
    return apiConnector<TaskResponse>({
      method: 'PUT',
      url,
      bodyData: updatedData,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Delete task by ID
  deleteTask: async (taskId: string): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/${taskId}`;
    return apiConnector<TaskResponse>({
      method: 'DELETE',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Toggle task status (Completed or Pending)
  toggleTaskStatus: async (taskId: string, status: 'Completed' | 'Pending'): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/status/${taskId}`;
    return apiConnector<TaskResponse>({
      method: 'PUT',
      url,
      bodyData: { status },
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Get tasks by category (Work, Personal, Other)
  getTasksByCategory: async (userId: string, category: string): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/${userId}/category/${category}`;
    return apiConnector<TaskResponse>({
      method: 'GET',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Get all pending tasks for a specific user
  getPendingTasks: async (userId: string): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/pending/${userId}`;
    return apiConnector<TaskResponse>({
      method: 'GET',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Get all completed tasks for a specific user
  getCompletedTasks: async (userId: string): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/completed/${userId}`;
    return apiConnector<TaskResponse>({
      method: 'GET',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  },

  // Search tasks by title
  searchTasks: async (query: string): Promise<TaskResponse> => {
    const token = getTokenFromLocalStorage();
    const url = `${BASE_URL}/search`;
    return apiConnector<TaskResponse>({
      method: 'GET',
      url,
      params: { query },
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }
};

