import {
  Box,
  HStack,
  Text,
  IconButton,
  Badge,
  Checkbox,
  useColorModeValue,
  Flex,
  useToast,
} from "@chakra-ui/react"
import { Trash2, Edit } from "lucide-react"

type Task = {
  _id: string
  title: string
  description: string
  category: "Work" | "Personal" | "Other"
  status: "Pending" | "Completed"
}

interface TaskItemProps {
  task: Task
  onEdit?: (task: Task) => void
}

const getCategoryColor = (category: "Work" | "Personal" | "Other") => {
  switch (category) {
    case "Work":
      return "blue"
    case "Personal":
      return "green"
    case "Other":
      return "purple"
    default:
      return "gray"
  }
}

export default function TaskItem({ task, onEdit }: TaskItemProps) {
  const toast = useToast()
  const bgColor = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      bg={bgColor}
      boxShadow="sm"
      transition="all 0.2s"
      _hover={{ boxShadow: "md" }}
    >
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Checkbox
          isChecked={task.status === "Completed"}
          colorScheme="teal"
          size="lg"
          alignSelf="flex-start"
          mt={1}
        />

        <Box flex="1">
          <Text
            fontSize="lg"
            fontWeight="medium"
            textDecoration={task.status === "Completed" ? "line-through" : "none"}
            opacity={task.status === "Completed" ? 0.7 : 1}
          >
            {task.title}
          </Text>

          <Text
            mt={2}
            color="gray.500"
            textDecoration={task.status === "Completed" ? "line-through" : "none"}
            opacity={task.status === "Completed" ? 0.7 : 1}
          >
            {task.description}
          </Text>

          <HStack mt={3} spacing={2}>
            <Badge colorScheme={getCategoryColor(task.category)}>{task.category}</Badge>
            <Badge colorScheme={task.status === "Completed" ? "green" : "yellow"}>{task.status}</Badge>
          </HStack>
        </Box>

        <HStack spacing={2} alignSelf={{ base: "flex-end", md: "center" }}>
          <IconButton
            icon={<Edit size={18} />}
            aria-label="Edit task"
            size="sm"
            colorScheme="blue"
            variant="ghost"
            onClick={() => onEdit && onEdit(task)}
          />
          <IconButton
            icon={<Trash2 size={18} />}
            aria-label="Delete task"
            size="sm"
            colorScheme="red"
            variant="ghost"
          />
        </HStack>
      </Flex>
    </Box>
  )
}
