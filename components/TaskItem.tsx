import React, { useRef, useState } from 'react'
import {
  Box,
  HStack,
  Text,
  Badge,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { Edit, Trash } from 'lucide-react'

interface TaskItemProps {
  task: {
    _id: string
    title: string
    description: string
    category: string
    status: 'Pending' | 'Completed'
  }
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)
  const confirmDelete = () => {
    onDelete(task._id)
    closeDialog()
  }

  const bgColor = useColorModeValue('white', 'gray.700')
  const descriptionColor = useColorModeValue('gray.600', 'gray.300')
  const metaColor = useColorModeValue('gray.500', 'gray.400')

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} bg={bgColor}>
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="bold">{task.title}</Text>
        <Badge colorScheme={task.status === 'Pending' ? 'yellow' : 'green'}>
          {task.status}
        </Badge>
      </HStack>
      <Text mt={2} color={descriptionColor}>{task.description}</Text>
      <Text mt={2} fontSize="sm" color={metaColor}>Category: {task.category}</Text>

      <HStack mt={4} justify="end">
        <IconButton
          icon={<Edit />}
          onClick={() => onEdit(task._id)}
          aria-label="Edit Task"
          colorScheme="blue"
        />
        <IconButton
          icon={<Trash />}
          onClick={openDialog}
          aria-label="Delete Task"
          colorScheme="red"
        />
      </HStack>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDialog}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeDialog}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}

export default TaskItem
