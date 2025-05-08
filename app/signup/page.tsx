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
  HStack,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  useColorModeValue,
  PinInput,
  PinInputField,
  FormErrorMessage,
} from "@chakra-ui/react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { sendOtpAction, signupUser, resetError } from "@/store/features/auth/authSlice"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [errors, setErrors] = useState({})

  const toast = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { loading, error, otpSent: reduxOtpSent } = useAppSelector((state) => state.auth)

  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  // Check if already authenticated
  useEffect(() => {
    if (reduxOtpSent) {
      setOtpSent(true)
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  }, [reduxOtpSent, toast])

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = async () => {
    if (!validateForm()) {
      return
    }

    try {
      await dispatch(sendOtpAction({ email: formData.email })).unwrap()
    } catch (error) {
      // Error will be handled by the useEffect
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid OTP",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      await dispatch(
        signupUser({
          ...formData,
          otp,
        }),
      ).unwrap()

      toast({
        title: "Account created",
        description: "Your account has been successfully created",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      // Redirect to login page after successful signup
      router.push("/login")
    } catch (error) {
      // Error will be handled by the useEffect
    }
  }

  return (
    <Container maxW="lg" py={{ base: 12, md: 16 }}>
      <Box p={8} bg={bgColor} boxShadow="lg" borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
        <VStack spacing={6} align="stretch">
          <Heading textAlign="center" size="xl" fontWeight="bold">
            Create an Account
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <HStack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.firstName}>
                  <FormLabel>First Name</FormLabel>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.lastName}>
                  <FormLabel>Last Name</FormLabel>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
              </HStack>

              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
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
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      icon={showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      variant="ghost"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              {!otpSent ? (
                <Button
                  colorScheme="teal"
                  size="lg"
                  width="full"
                  mt={4}
                  onClick={handleSendOtp}
                  isLoading={loading}
                  loadingText="Sending OTP"
                >
                  Send OTP
                </Button>
              ) : (
                <>
                  <FormControl isRequired>
                    <FormLabel>Enter OTP</FormLabel>
                    <HStack justify="center">
                      <PinInput otp size="lg" value={otp} onChange={setOtp}>
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                  </FormControl>

                  <HStack width="full" justify="space-between">
                    <Button
                      variant="outline"
                      onClick={handleSendOtp}
                      isLoading={loading}
                      loadingText="Resending"
                    >
                      Resend OTP
                    </Button>

                    <Button type="submit" colorScheme="teal" isLoading={loading} loadingText="Signing up">
                      Sign Up
                    </Button>
                  </HStack>
                </>
              )}
            </VStack>
          </form>

          <Flex justify="center" mt={4}>
            <Text>
              Already have an account?{" "}
              <Link href="/login" passHref>
                <Text as="span" color="teal.500" fontWeight="semibold">
                  Login
                </Text>
              </Link>
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Container>
  )
}
