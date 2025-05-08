"use client"

import { VStack, Text, Box, useColorModeValue, Spinner, Center } from "@chakra-ui/react"
import TaskItem from "./TaskItem"

export default function TaskList({ tasks, onEditTask, status, error, onToggleStatus, onDelete }) {
  const emptyBgColor = useColorModeValue("gray.50", "gray.700")

  if (status === "loading") {
    return (
      <Center py={10}>
        <Spinner size="xl" color="teal.500" thickness="4px" />
      </Center>
    )
  }

  if (error) {
    return (
      <Box p={8} textAlign="center" borderRadius="md" bg={emptyBgColor}>
        <Text fontSize="lg" color="red.500">
          Error: {error}
        </Text>
      </Box>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Box p={8} textAlign="center" borderRadius="md" bg={emptyBgColor}>
        <Text fontSize="lg" color="gray.500">
          No tasks found. Create a new task to get started!
        </Text>
      </Box>
    )
  }

  return (
    <VStack spacing={4} align="stretch">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEditTask}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </VStack>
  )
}
