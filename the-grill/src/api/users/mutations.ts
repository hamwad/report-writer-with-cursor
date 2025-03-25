import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { userKeys } from '.'
import getRequestClient from '../../lib/getRequestClient'
import type { users } from '@/lib/client'

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const encoreClient = getRequestClient()
  return useMutation({
    mutationFn: (params: users.CreateUserDto) => encoreClient.users.create(params),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list.queryKey })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const encoreClient = getRequestClient()
  return useMutation({
    mutationFn: (id: string) => encoreClient.users.destroy(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list.queryKey })
    },
  })
}
