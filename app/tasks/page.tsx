"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react"
import TaskList from "@/components/TaskList"
import TaskForm from "@/components/TaskForm"
import FilterBar from "@/components/FilterBar"

// Define Task interface
interface Task {
  _id: string
  title: string
  description: string
  category: string
  status: string
}

export default function TasksPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const bgColor = useColorModeValue("white", "gray.800")

  // Sample static task data for UI preview
  const tasks: Task[] = [
    {
      _id: "1",
      title: "Finish project report",
      description: "Due by end of the week",
      category: "Work",
      status: "Pending",
    },
    {
      _id: "2",
      title: "Buy groceries",
      description: "Milk, eggs, and bread",
      category: "Personal",
      status: "Completed",
    },
  ]

  // Edit task handler
  const handleEditTask = (task: Task): void => {
    setEditingTask(task)
    onOpen()
  }

  // Close task form handler
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

          <FilterBar onAddTask={onOpen} />

          <Box mt={6}>
            <TaskList tasks={tasks} onEditTask={handleEditTask} />
          </Box>
        </Box>
      </VStack>

      <TaskForm isOpen={isOpen} onClose={handleCloseForm} editTask={editingTask} />
    </Container>
  )
}
