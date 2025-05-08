"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  useDisclosure,
  useColorModeValue,
  Spinner,
  Text,
} from "@chakra-ui/react"

import TaskList from "@/components/TaskList"
import TaskForm from "@/components/TaskForm"
import FilterBar from "@/components/FilterBar"
import { Task } from "@/types/task"

export default function TasksPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([]) // placeholder local state
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const bgColor = useColorModeValue("white", "gray.800")

  useEffect(() => {
    // You can replace this with actual fetch logic later
    setLoading(true)
    try {
      // Simulate fetch
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        console.log("Fetch tasks for user:", user._id)
        // setTasks(...) with fetched tasks
      }
    } catch (err) {
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleEditTask = (task: Task): void => {
    setEditingTask(task)
    onOpen()
  }

  const handleSaveTask = (task: Omit<Task, "_id" | "createdAt" | "updatedAt">): void => {
    if (editingTask) {
      // Handle update logic
    } else {
      // Handle create logic
    }
    handleCloseForm()
  }

  const handleDeleteTask = (taskId: string): void => {
    // Handle delete logic
  }

  const handleCloseForm = (): void => {
    setEditingTask(null)
    onClose()
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box p={6} borderRadius="lg" bg={bgColor} boxShadow="md">
          <HStack justify="space-between" mb={6}>
            <Heading size="lg">Task Manager</Heading>
          </HStack>

          <FilterBar onAddTaskAction={onOpen} />

          <Box mt={6}>
            {loading ? (
              <Spinner />
            ) : error ? (
              <Text color="red.500">Error: {error}</Text>
            ) : (
              <TaskList
                tasks={tasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </Box>
        </Box>
      </VStack>

      <TaskForm
        isOpen={isOpen}
        onCloseAction={handleCloseForm}
        editTask={editingTask}
        onSave={handleSaveTask}
      />
    </Container>
  )
}

