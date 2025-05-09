import React from 'react'
import { Box, Input, Button, Select, HStack } from '@chakra-ui/react'

interface FilterBarProps {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  onSearch: () => void
  onCategoryFilter: (category: string) => void
  onStatusFilter: (status: 'Pending' | 'Completed' | '') => void
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  onCategoryFilter,
  onStatusFilter,
}) => {
  return (
    <Box>
      <HStack spacing={4}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch()
          }}
          placeholder="Search tasks"
          size="md"
        />
        <Button onClick={onSearch} colorScheme="teal">
          Search
        </Button>
      </HStack>

      <HStack spacing={4} mt={4}>
        <Select
          placeholder="Select Category"
          onChange={(e) => onCategoryFilter(e.target.value)}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </Select>

        <Select
          placeholder="Select Status"
          onChange={(e) => onStatusFilter(e.target.value as 'Pending' | 'Completed' | '')}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </Select>
      </HStack>
    </Box>
  )
}

export default FilterBar
