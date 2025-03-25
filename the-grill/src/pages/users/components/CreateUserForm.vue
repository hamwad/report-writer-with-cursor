<script setup lang="ts">
import { useCreateUser } from '@/api/users'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'

const { mutateAsync: createUser, isPending } = useCreateUser()

const schema = toTypedSchema(
  zod.object({
    name: zod.string().min(1, { message: 'Required field' }),
    surname: zod.string().min(1, { message: 'Required field' }),
  }),
)

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: { name: '', surname: '' },
})

const { value: name } = useField<string>('name')
const { value: surname } = useField<string>('surname')

const onSubmit = handleSubmit(async (values) => {
  await createUser(values)
  resetForm()
})
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex gap-4">
    <div class="flex flex-col gap-1">
      <label for="nameInput">Name</label>
      <InputText id="nameInput" placeholder="Name" v-model="name" />
    </div>

    <div class="flex flex-col gap-1">
      <label for="surnameInput">Surname</label>
      <InputText id="surnameInput" placeholder="Surname" v-model="surname" />
    </div>

    <div class="flex h-fit self-end">
      <Button label="Add user" type="submit" :disabled="isPending" />
    </div>
  </form>
</template>
