export type TaskCategory = "Work" | "Personal" | "Other"
export type TaskStatus = "Pending" | "Completed"

export interface Task {
  _id: string
  title: string
  description: string
  category: TaskCategory
  status: TaskStatus
  user: string
  createdAt?: string
  updatedAt?: string
}
