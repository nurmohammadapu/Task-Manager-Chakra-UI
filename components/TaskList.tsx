import React from 'react'
import { Box, VStack, useColorModeValue } from '@chakra-ui/react'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: {
    _id: string
    title: string
    description: string
    category: string
    status: 'Pending' | 'Completed'
  }[]
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const emptyTextColor = useColorModeValue("gray.500", "gray.400")

  return (
    <VStack spacing={4} align="stretch">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <Box p={4} textAlign="center" color={emptyTextColor}>
          No tasks available.
        </Box>
      )}
    </VStack>
  )
}

export default TaskList
