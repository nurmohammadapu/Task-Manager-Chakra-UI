"use client"

import { Button, useToast } from "@chakra-ui/react"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { logoutUser, resetError } from "@/store/features/auth/authSlice"

// Define the types for Redux state
interface AuthState {
  loading: boolean
  error: string | null
}

export default function LogoutButton() {
  const toast = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()

  // Get the current loading and error status from the Redux state
  const { loading, error }: AuthState = useAppSelector((state) => state.auth)

  const handleLogout = async (): Promise<void> => {
    try {
      // Dispatch the logout action
      await dispatch(logoutUser()).unwrap()

      // Reset any errors after logging out
      dispatch(resetError())

      toast({
        title: "Success",
        description: "Logged out successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })

      // Redirect to login page after successful logout
      router.push("/login")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Button
      leftIcon={<LogOut size={16} />}
      variant="ghost"
      onClick={handleLogout}
      size="sm"
      isLoading={loading}  // Loading state based on Redux status
    >
      Logout
    </Button>
  )
}
