import {
  VStack,
  Text,
  Box,
  useColorModeValue,
  Spinner,
  Center,
} from "@chakra-ui/react"
import TaskItem from "./TaskItem"

type Task = {
  _id: string
  title: string
  description: string
  category: "Work" | "Personal" | "Other"
  status: "Pending" | "Completed"
  user: string
  createdAt: string
  updatedAt: string
}

interface TaskListProps {
  tasks: Task[]
  onToggleStatus?: (taskId: string, currentStatus: "Pending" | "Completed") => void
  onDelete?: (taskId: string) => void
  loading?: boolean
  error?: string
}

export default function TaskList({ tasks = [], onToggleStatus, onDelete, loading, error }: TaskListProps) {
  const emptyBgColor = useColorModeValue("gray.50", "gray.700")

  /**
   * Loading State
   */
  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="teal.500" thickness="4px" />
      </Center>
    )
  }

  /**
   * Error State
   */
  if (error) {
    return (
      <Box p={8} textAlign="center" borderRadius="md" bg={emptyBgColor}>
        <Text fontSize="lg" color="red.500">
          Error: {error}
        </Text>
      </Box>
    )
  }

  /**
   * Empty State
   */
  if (tasks.length === 0) {
    return (
      <Box p={8} textAlign="center" borderRadius="md" bg={emptyBgColor}>
        <Text fontSize="lg" color="gray.500">
          No tasks found. Create a new task to get started!
        </Text>
      </Box>
    )
  }

  /**
   * Task List Rendering
   */
  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  )
}
