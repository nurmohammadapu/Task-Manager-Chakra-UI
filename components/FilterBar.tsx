import {
  HStack,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Button,
  Box,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react"
import { Search, Plus } from "lucide-react"
import { useState } from "react"

interface FilterBarProps {
  onAddTaskAction: () => void
}

export default function FilterBar({ onAddTaskAction }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const isMobile = useBreakpointValue({ base: true, md: false })

  // Update search query state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Trigger search on pressing Enter key
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Search Query:", searchQuery)
    }
  }

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={4} align={{ base: "stretch", md: "center" }}>
      <InputGroup flex="1">
        <InputLeftElement pointerEvents="none">
          <Search size={18} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyUp={handleKeyUp}
        />
        <Button ml={2} colorScheme="teal" variant="outline">
          Search
        </Button>
      </InputGroup>

      <HStack spacing={4} flex={{ md: 1 }}>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          placeholder="All Categories"
          size={isMobile ? "md" : "md"}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          placeholder="All Status"
          size={isMobile ? "md" : "md"}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </Select>
      </HStack>

      <Box>
        <Button
          leftIcon={<Plus size={18} />}
          colorScheme="teal"
          onClick={onAddTaskAction}
          width={{ base: "100%", md: "auto" }}
        >
          Add Task
        </Button>
      </Box>
    </Flex>
  )
}
