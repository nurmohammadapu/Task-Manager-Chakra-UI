"use client"

import { useEffect, useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react"

// Define types for Task and User
interface Task {
  _id?: string
  title: string
  description: string
  category: string
  status: string
}

interface User {
  _id: string
  username: string
  email: string
}

// Define type for TaskForm props
interface TaskFormProps {
  isOpen: boolean
  onCloseAction: () => void  // Renamed to onCloseAction
  editTask?: Task | null
  onAddTask?: (taskData: Task & { user: string }) => Promise<void>
  onUpdateTask?: (taskData: { taskId: string; taskData: Task }) => Promise<void>
}

const initialTaskState: Task = {
  title: "",
  description: "",
  category: "Work",
  status: "Pending",
}

export default function TaskForm({
  isOpen,
  onCloseAction,  // Renamed to onCloseAction
  editTask,
  onAddTask,
  onUpdateTask,
}: TaskFormProps) {
  const [task, setTask] = useState<Task>(initialTaskState)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const toast = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  useEffect(() => {
    setTask(editTask || initialTaskState)
  }, [editTask, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTask((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!task.title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create tasks",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      setIsLoading(true)

      if (editTask) {
        await onUpdateTask?.({
          taskId: editTask._id!,
          taskData: task,
        })

        toast({
          title: "Task updated",
          status: "success",
          duration: 2000,
        })
      } else {
        await onAddTask?.({
          ...task,
          user: user._id,
        })

        toast({
          title: "Task added",
          status: "success",
          duration: 2000,
        })
      }

      onCloseAction() // Use onCloseAction instead of onClose
      setTask(initialTaskState)
    } catch (error: any) {  // Specify the type for error
      toast({
        title: "Error",
        description: error?.message || "Failed to save task",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseAction} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editTask ? "Edit Task" : "Add New Task"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={task.title} onChange={handleChange} placeholder="Enter task title" />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter task description"
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select name="category" value={task.category} onChange={handleChange}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            {editTask && (
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select name="status" value={task.status} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Select>
              </FormControl>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onCloseAction}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit} isLoading={isLoading}>
            {editTask ? "Update" : "Add"} Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
