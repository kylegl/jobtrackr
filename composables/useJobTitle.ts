import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { JobTitleAddInput, JobTitleDeleteInput, JobTitleGetByIdInput, JobTitleListInput } from '~~/server/trpc/router/routes/jobTitleRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateJobTitleOutput = RouterOutput['jobTitle']['add']
type DeleteJobTitleOutput = RouterOutput['jobTitle']['delete']

export function useJobTitleAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: JobTitleAddInput) => useAsyncData<CreateJobTitleOutput, ErrorOutput>(() => $client.jobTitle.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['jobTitle', 'list'])
      const previousJobTitles = vueQueryClient.getQueryData(['jobTitle', 'list'])
      const newJobTitle = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['jobTitle', 'list'],
        (old) => {
          return old ? [newJobTitle, ...old] : undefined
        },
      )

      return { previousJobTitles }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['jobTitle', 'list'] }),
  })
}

export function useJobTitleList(input: JobTitleListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.jobTitle.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['jobTitle', 'list', input], queryFn })
}

export function useJobTitleDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: JobTitleDeleteInput) => {
    return useAsyncData<DeleteJobTitleOutput, ErrorOutput>
    (
      () => $client.jobTitle.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['jobTitle', 'list'])
      const previousJobTitles = vueQueryClient.getQueryData(['jobTitle', 'list'])

      vueQueryClient.setQueryData(['jobTitle', 'list'], (old) => {
        return old ? old?.filter(jobTitle => jobTitle.id !== id) : undefined
      })

      return { previousJobTitles }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['jobTitle', 'list'], context?.previousJobTitles)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['jobTitle', 'list'] }),
  })
}

export function useJobTitleGetById(input: JobTitleGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.jobTitle.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['jobTitle', 'getById', input], queryFn })
}
