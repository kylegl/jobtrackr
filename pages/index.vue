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
    <Logos mb-6 />
    <Suspense>
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
    <div v-if="employees" flex="~ col" items-center justify-center gap2>
      <div flex="~ col" gap2>
        <Btn @click="handleAddContact">Add</Btn>
      </div>
      {{ employees.length }}
      <div flex="~ col" />
      <div v-for="emp in employees" :key="emp?.id">
        <div flex-inline gap4>
          <span>{{ emp?.name }}</span>
          <Btn @click="handleDelete(emp.id)">
            Delete
          </Btn>
        </div>
      </div>
    </div>
  </div>
</template>
