import { useQuery } from '@tanstack/vue-query'
import { userKeys } from './keys'
import getRequestClient from '../../lib/getRequestClient'

export const useListUsers = (page: number, limit: number) => {
  const encoreClient = getRequestClient()
  return useQuery({
    queryKey: userKeys.list.queryKey,
    queryFn: () => encoreClient.users.list({ page, limit }),
  })
}
