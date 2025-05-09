"use client";
import React, { useEffect, useState } from 'react';
import {
  Container,
  Heading,
  VStack,
  Box,
  Button,
  useDisclosure,
  Spinner,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasks,
  searchTasks,
  fetchTasksByCategory,
  fetchPendingTasks,
  fetchCompletedTasks,
  deleteTaskById,
} from '@/store/features/tasks/tasksSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Task, TaskCategory } from '@/types/task'; // Import types
import TaskList from '@/components/TaskList';
import FilterBar from '@/components/FilterBar';
import TaskForm from '@/components/TaskForm';

// Helper function to validate TaskCategory
const isValidCategory = (category: string): category is TaskCategory => {
  return ['Work', 'Personal', 'Other'].includes(category);
};

export default function TasksPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Pending' | 'Completed' | ''>(''); 
  const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null); // Track the task being edited

  // Retrieve userId from localStorage
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
  const userId = storedUser ? JSON.parse(storedUser)._id : '';

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks({ userId }));
    }
  }, [dispatch, userId]);

  const handleSearch = () => {
    if (searchQuery) {
      dispatch(searchTasks(searchQuery));
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      dispatch(fetchTasksByCategory({ userId, category }));
    } else {
      dispatch(fetchTasks({ userId }));
    }
  };

  const handleStatusFilter = (status: 'Pending' | 'Completed' | '') => {
    setStatusFilter(status);
    if (status === 'Pending') {
      dispatch(fetchPendingTasks(userId));
    } else if (status === 'Completed') {
      dispatch(fetchCompletedTasks(userId));
    } else {
      dispatch(fetchTasks({ userId }));
    }
  };

  const handleEdit = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
      const validCategory: TaskCategory = isValidCategory(taskToEdit.category)
        ? taskToEdit.category
        : 'Other'; 

      // Now set the task with the valid category
      setTaskBeingEdited({
        ...taskToEdit,
        category: validCategory,
      });
      onOpen(); // Open the form modal to edit
    }
  };

  const handleDelete = (taskId: string) => {
    dispatch(deleteTaskById(taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory && task.category !== selectedCategory) return false;
    if (statusFilter && task.status !== statusFilter) return false;
    return true;
  });

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box p={6} borderRadius="lg" bg={bgColor} boxShadow="md">
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading color={headingColor}>Task Manager</Heading>
            <Button onClick={onOpen} colorScheme="teal">
              Add New Task
            </Button>
          </Flex>

          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            onStatusFilter={handleStatusFilter}
          />

          <Box mt={6}>
            {loading ? (
              <Flex justify="center" align="center">
                <Spinner size="xl" />
              </Flex>
            ) : error ? (
              <Text color="red.500">Error: {error}</Text>
            ) : filteredTasks.length === 0 ? (
              <Flex justify="center" align="center">
                <Text color={textColor}>No tasks available in this filter</Text>
              </Flex>
            ) : (
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </Box>
        </Box>
      </VStack>

      <TaskForm
        isOpen={isOpen}
        onCloseAction={() => {
          setTaskBeingEdited(null);
          onClose();
        }}
        editTask={taskBeingEdited} // Pass the task being edited to the form
      />
    </Container>
  );
}
