"use client"

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
import { useEffect, useState } from "react"

// Define the prop types for the FilterBar component
interface FilterBarProps {
  onAddTaskAction: () => void  // Renamed to onAddTaskAction
  onSearch?: (searchQuery: string) => void
  onCategoryChange?: (category: string) => void
  onStatusChange?: (status: string) => void
}

export default function FilterBar({
  onAddTaskAction, 
  onSearch,
  onCategoryChange,
  onStatusChange,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [userId, setUserId] = useState<string | null>(null)  // userId can be string or null
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const user = JSON.parse(storedUser)
        setUserId(user._id)
      }
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (): void => {
    if (searchQuery.trim() && userId) {
      onSearch?.(searchQuery)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearchSubmit()
    }
  }

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value
    setCategoryFilter(value)
    onCategoryChange?.(value)
  }

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value
    setStatusFilter(value)
    onStatusChange?.(value)
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
        <Button ml={2} onClick={handleSearchSubmit} colorScheme="teal" variant="outline">
          Search
        </Button>
      </InputGroup>

      <HStack spacing={4} flex={{ md: 1 }}>
        <Select
          value={categoryFilter}
          onChange={handleCategorySelect}
          placeholder="All Categories"
          size={isMobile ? "md" : "md"}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </Select>

        <Select
          value={statusFilter}
          onChange={handleStatusSelect}
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
          onClick={onAddTaskAction}  // Use the updated prop name
          width={{ base: "100%", md: "auto" }}
        >
          Add Task
        </Button>
      </Box>
    </Flex>
  )
}
