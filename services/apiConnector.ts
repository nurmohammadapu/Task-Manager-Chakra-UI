import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosHeaders } from "axios"

export const axiosInstance = axios.create({})

// Add request interceptor to include token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        // Ensure we merge headers correctly using AxiosHeaders
        if (config.headers) {
          (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`)
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)




interface ApiConnectorParams {
  method: "GET" | "POST" | "PUT" | "DELETE" 
  url: string
  bodyData?: Record<string, any> | null
  headers?: Record<string, string> | null
  params?: Record<string, string | number | boolean> | null
}

export const apiConnector = async <T>({
  method,
  url,
  bodyData,
  headers,
  params,
}: ApiConnectorParams): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData || null,
    ...(headers ? { headers } : {}),  // Merge headers if provided
    params: params || undefined,
  }

  try {
    const response: AxiosResponse<T> = await axiosInstance(config)
    return response.data
  } catch (error: any) {
    // Handle errors appropriately, e.g., log them or re-throw a custom error
    console.error("API request failed:", error)
    throw error  // Re-throw the error to be handled by the caller
  }
}
