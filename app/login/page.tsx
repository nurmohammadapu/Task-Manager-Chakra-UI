"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { loginUser, resetError } from "@/store/features/auth/authSlice"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const toast = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()

  // Accessing auth state from Redux
  const { loading, error, user, token } = useAppSelector((state) => state.auth)
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  // Check if already authenticated
  useEffect(() => {
    if (user && token) {
      router.push("/tasks") // Redirect to the tasks page if logged in
    }
  }, [user, token, router])

  // Handle error messages from redux state
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      dispatch(resetError())  // Reset error after showing the toast
    }
  }, [error, toast, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      // Dispatch login action
      const result = await dispatch(loginUser({ email, password })).unwrap()

      toast({
        title: "Success",
        description: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      // Redirect to tasks page after successful login
      router.push("/tasks")
    } catch (error) {
      // Error handling is already managed by the useEffect
    }
  }

  return (
    <Container maxW="lg" py={{ base: 12, md: 16 }}>
      <Box p={8} bg={bgColor} boxShadow="lg" borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="xl" fontWeight="bold">
            Login to Task Manager
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                width="full"
                mt={4}
                isLoading={loading}
                loadingText="Logging in"
              >
                Login
              </Button>
            </VStack>
          </form>

          <Flex justify="center" mt={4}>
            <Text>
              Don&apos;t have an account?{" "}
              <Link href="/signup" passHref>
                <Text as="span" color="teal.500" fontWeight="semibold">
                  Sign up
                </Text>
              </Link>
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Container>
  )
}
