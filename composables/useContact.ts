import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { ContactAddInput, ContactDeleteInput, ContactGetByIdInput, ContactListInput } from '~~/server/trpc/router/routes/contactRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateContactOutput = RouterOutput['contact']['add']
type DeleteContactOutput = RouterOutput['contact']['delete']

export function useContactAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: ContactAddInput) => useAsyncData<CreateContactOutput, ErrorOutput>(() => $client.contact.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['contact', 'list'])
      const previousContacts = vueQueryClient.getQueryData(['contact', 'list'])
      const newContact = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['contact', 'list'],
        (old) => {
          return old ? [newContact, ...old] : undefined
        },
      )

      return { previousContacts }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['contact', 'list'] }),
  })
}

export function useContactList(input: ContactListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.contact.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['contact', 'list', input], queryFn })
}

export function useContactDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: ContactDeleteInput) => {
    return useAsyncData<DeleteContactOutput, ErrorOutput>
    (
      () => $client.contact.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['contact', 'list'])
      const previousContacts = vueQueryClient.getQueryData(['contact', 'list'])

      vueQueryClient.setQueryData(['contact', 'list'], (old) => {
        return old ? old?.filter(contact => contact.id !== id) : undefined
      })

      return { previousContacts }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['contact', 'list'], context?.previousContacts)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['contact', 'list'] }),
  })
}

export function useContactGetById(input: ContactGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.contact.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['contact', 'getById', input], queryFn })
}
