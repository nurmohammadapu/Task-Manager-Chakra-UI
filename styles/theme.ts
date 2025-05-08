import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

export const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  colors: {
    teal: {
      50: "#E6FFFA",
      100: "#B2F5EA",
      200: "#81E6D9",
      300: "#4FD1C5",
      400: "#38B2AC",
      500: "#319795",
      600: "#2C7A7B",
      700: "#285E61",
      800: "#234E52",
      900: "#1D4044",
    },
  },
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "gray.900")(props),
        minHeight: "100vh",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "md",
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "md",
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: "md",
        },
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: "md",
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: "xl",
        },
      },
    },
  },
})
