"use client"

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Heading,
} from "@chakra-ui/react"
import { Menu, X, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "./LogoutButton"
import { useEffect, useState } from "react"

const Links = [
  { name: "Home", href: "/" },
  { name: "Tasks", href: "/tasks" },
]

const NavLink = ({ children, href, isActive }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200")
  const activeColor = useColorModeValue("teal.500", "teal.300")

  return (
    <Box
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      color={isActive ? activeColor : linkColor}
      fontWeight={isActive ? "bold" : "medium"}
      _hover={{
        textDecoration: "none",
        color: activeColor,
      }}
      href={href}
    >
      {children}
    </Box>
  )
}

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [pathname])

  return (
    <Box bg={useColorModeValue("white", "gray.800")} px={4} boxShadow="sm" position="sticky" top={0} zIndex={10}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <X size={20} /> : <Menu size={20} />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Heading size="md" color={useColorModeValue("teal.500", "teal.300")}>
            TaskManager
          </Heading>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} href={link.href} isActive={pathname === link.href}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"} gap={4}>
          <Button onClick={toggleColorMode} size="sm">
            {colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <HStack spacing={2}>
              <Button as={Link} href="/login" variant="ghost" size="sm">
                Login
              </Button>
              <Button as={Link} href="/signup" colorScheme="teal" size="sm">
                Sign Up
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} href={link.href} isActive={pathname === link.href}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
