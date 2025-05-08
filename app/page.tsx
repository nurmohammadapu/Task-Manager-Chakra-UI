"use client"

import { Box, Button, Container, Heading, Text, VStack, Image, Flex, useColorMode } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const { colorMode } = useColorMode()

  return (
    <Container maxW="container.xl" py={10}>
      <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" gap={10}>
        <VStack spacing={6} align="flex-start" flex={1} maxW={{ base: "100%", md: "50%" }}>
          <Heading as="h1" size="2xl">
            Organize Your Life with Task Manager
          </Heading>
          <Text fontSize="xl" color={colorMode === "dark" ? "gray.300" : "gray.600"}>
            A simple, intuitive task management application to help you stay organized and productive.
          </Text>
          <Box>
            <Button size="lg" colorScheme="teal" onClick={() => router.push("/tasks")} mr={4}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" colorScheme="teal" onClick={() => router.push("/tasks")}>
              Learn More
            </Button>
          </Box>
          <Box p={4} bg={colorMode === "dark" ? "gray.700" : "gray.100"} borderRadius="md" width="100%">
            <Heading as="h3" size="md" mb={2}>
              Key Features
            </Heading>
            <VStack align="flex-start" spacing={2}>
              <Text>✓ Create, edit, and delete tasks</Text>
              <Text>✓ Categorize tasks by Work, Personal, or Other</Text>
              <Text>✓ Track completion status</Text>
              <Text>✓ Filter and search functionality</Text>
              <Text>✓ Responsive design for all devices</Text>
            </VStack>
          </Box>
        </VStack>

        <Box flex={1} maxW={{ base: "100%", md: "50%" }} borderRadius="xl" overflow="hidden" boxShadow="xl">
          <Image
            src="/heropic.jpg"
            alt="Task Manager Dashboard Preview"
            width="100%"
            height="auto"
          />
        </Box>
      </Flex>
    </Container>
  )
}
