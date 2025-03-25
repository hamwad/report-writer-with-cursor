import { QueryClient } from '@tanstack/vue-query'
import { isAxiosError } from 'axios'

const MAX_RETRIES = 2
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404, 422]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount > MAX_RETRIES) {
          return false
        }

        if (isAxiosError(error)) {
          if (HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)) return false
        }

        return true
      },
      staleTime: 1000 * 60,
    },
  },
})
export default queryClient
