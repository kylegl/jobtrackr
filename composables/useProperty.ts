import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { PropertyAddInput, PropertyDeleteInput, PropertyGetByIdInput, PropertyListInput } from '~~/server/trpc/router/routes/propertyRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreatePropertyOutput = RouterOutput['property']['add']
type DeletePropertyOutput = RouterOutput['property']['delete']

export function usePropertyAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: PropertyAddInput) => useAsyncData<CreatePropertyOutput, ErrorOutput>(() => $client.property.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['property', 'list'])
      const previousProperties = vueQueryClient.getQueryData(['property', 'list'])
      const newProperty = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['property', 'list'],
        (old) => {
          return old ? [newProperty, ...old] : undefined
        },
      )

      return { previousProperties }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['property', 'list'] }),
  })
}

export function usePropertyList(input: PropertyListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.property.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['property', 'list', input], queryFn })
}

export function usePropertyDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: PropertyDeleteInput) => {
    return useAsyncData<DeletePropertyOutput, ErrorOutput>
    (
      () => $client.property.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['property', 'list'])
      const previousProperties = vueQueryClient.getQueryData(['property', 'list'])

      vueQueryClient.setQueryData(['property', 'list'], (old) => {
        return old ? old?.filter(property => property.id !== id) : undefined
      })

      return { previousProperties }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['property', 'list'], context?.previousProperties)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['property', 'list'] }),
  })
}

export function usePropertyGetById(input: PropertyGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.property.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['property', 'getById', input], queryFn })
}
