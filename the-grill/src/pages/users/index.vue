<script setup lang="ts">
import { useDeleteUser } from '@/api/users'
import { useListUsers } from '@/api/users'
import { users } from '@/lib/client'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const usersList = ref<users.UserDto[]>([])

const page = ref(1)
const limit = ref(10)

const { data: userData } = useListUsers(page.value, limit.value)

watch(
  userData,
  (newUserData) => {
    if (!newUserData) return
    usersList.value = newUserData.result ?? []
  },
  { immediate: true },
)

const { mutateAsync: deleteUser } = useDeleteUser()

const handleDeleteUser = async (id: string) => {
  await deleteUser(id)
}
</script>

<template>
  <div>
    <h1>Users</h1>
    <div class="flex flex-col gap-4">
      <div class="bg-red-200 p-2 w-1/2 rounded-lg">
        <CreateUserForm />
      </div>
      <div class="flex gap-2 max-w-1/2 flex-wrap">
        <div
          v-for="user in usersList"
          class="bg-red-200 rounded-lg flex items-center px-12 py-2 w-fit"
        >
          {{ user.name }}
          <Button variant="text" @click="handleDeleteUser(user.id)">
            <template #icon>
              <FontAwesomeIcon :icon="['far', 'trash-can']" />
            </template>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
