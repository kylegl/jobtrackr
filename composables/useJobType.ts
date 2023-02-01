import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { JobTypeAddInput, JobTypeDeleteInput, JobTypeGetByIdInput, JobTypeListInput } from '~~/server/trpc/router/routes/jobTypeRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateJobTypeOutput = RouterOutput['jobType']['add']
type DeleteJobTypeOutput = RouterOutput['jobType']['delete']

export function useJobTypeAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: JobTypeAddInput) => useAsyncData<CreateJobTypeOutput, ErrorOutput>(() => $client.jobType.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['jobType', 'list'])
      const previousJobTypes = vueQueryClient.getQueryData(['jobType', 'list'])
      const newJobType = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['jobType', 'list'],
        (old) => {
          return old ? [newJobType, ...old] : undefined
        },
      )

      return { previousJobTypes }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['jobType', 'list'] }),
  })
}

export function useJobTypeList(input: JobTypeListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.jobType.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['jobType', 'list', input], queryFn })
}

export function useJobTypeDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: JobTypeDeleteInput) => {
    return useAsyncData<DeleteJobTypeOutput, ErrorOutput>
    (
      () => $client.jobType.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['jobType', 'list'])
      const previousJobTypes = vueQueryClient.getQueryData(['jobType', 'list'])

      vueQueryClient.setQueryData(['jobType', 'list'], (old) => {
        return old ? old?.filter(jobType => jobType.id !== id) : undefined
      })

      return { previousJobTypes }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['jobType', 'list'], context?.previousJobTypes)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['jobType', 'list'] }),
  })
}

export function useJobTypeGetById(input: JobTypeGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.jobType.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['jobType', 'getById', input], queryFn })
}
