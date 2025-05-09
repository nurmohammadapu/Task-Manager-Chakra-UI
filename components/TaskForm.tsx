"use client";
import React, { useEffect, useState } from 'react';
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
  useColorModeValue,
} from '@chakra-ui/react';
import { useAppDispatch } from '@/store/hooks';
import { createNewTask, updateExistingTask } from '@/store/features/tasks/tasksSlice';

interface Task {
  _id?: string;
  title: string;
  description: string;
  category: string;
  status: 'Pending' | 'Completed';
}

interface TaskFormProps {
  isOpen: boolean;
  onCloseAction: () => void;
  editTask?: Task | null;
}

const initialTaskState: Task = {
  title: '',
  description: '',
  category: 'Work',
  status: 'Pending',
};

const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onCloseAction, editTask }) => {
  const [task, setTask] = useState<Task>(initialTaskState);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useAppDispatch();

  const modalBg = useColorModeValue('white', 'gray.800');
  const labelColor = useColorModeValue('gray.700', 'gray.200');

  useEffect(() => {
    setTask(editTask || initialTaskState);
  }, [editTask, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!task.title.trim()) {
      toast({
        title: 'Error',
        description: 'Task title is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const userId = storedUser ? JSON.parse(storedUser)._id : null;

    if (!userId) {
      toast({
        title: 'Error',
        description: 'User not found. Please log in again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);

      if (editTask && editTask._id) {
        await dispatch(updateExistingTask({ taskId: editTask._id, updatedData: task })).unwrap();
      } else {
        await dispatch(createNewTask({ ...task, user: userId })).unwrap();
      }

      toast({
        title: editTask ? 'Task updated' : 'Task added',
        status: 'success',
        duration: 2000,
      });

      onCloseAction();
      setTask(initialTaskState);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to save task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseAction} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent bg={modalBg}>
        <ModalHeader>{editTask ? 'Edit Task' : 'Add New Task'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color={labelColor}>Title</FormLabel>
              <Input
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Enter task title"
              />
            </FormControl>

            <FormControl>
              <FormLabel color={labelColor}>Description</FormLabel>
              <Textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Enter task description"
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={labelColor}>Category</FormLabel>
              <Select name="category" value={task.category} onChange={handleChange}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            {editTask && (
              <FormControl>
                <FormLabel color={labelColor}>Status</FormLabel>
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
            {editTask ? 'Update' : 'Add'} Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskForm;
