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

export default function FilterBar({ onAddTask, onSearch, onCategoryChange, onStatusChange }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [userId, setUserId] = useState(null)
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim() && userId) {
      onSearch?.(searchQuery)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit()
    }
  }

  const handleCategorySelect = (e) => {
    const value = e.target.value
    setCategoryFilter(value)
    onCategoryChange?.(value)
  }

  const handleStatusSelect = (e) => {
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
          onKeyPress={handleKeyPress}
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
          onClick={onAddTask}
          width={{ base: "100%", md: "auto" }}
        >
          Add Task
        </Button>
      </Box>
    </Flex>
  )
}
