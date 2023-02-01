<script setup lang="ts">
import type { ContactAddInput } from '~~/server/trpc/router/routes'

const { data: employees } = useContactList({})
const deleteEmployee = useEmployeeDelete()
const addContact = useContactAdd()

const newContact: ContactAddInput = {
  name: 'Lo',
  email: 'lo@lo.com',
  phone: '123456789',
}

async function handleAddContact() {
  const employee = await addContact.mutateAsync(newContact)
  return employee
}

async function handleDelete(id: string) {
  const res = await deleteEmployee.mutateAsync({ id })

  return res
}
</script>

<template>
  <div flex="~ col" gap4 justify-center items-center text-gray>
    <h1>Hello World</h1>
  </div>
</template>
