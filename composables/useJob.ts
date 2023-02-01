import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { JobAddInput, JobDeleteInput, JobGetByIdInput, JobListInput } from '~~/server/trpc/router/routes/jobRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateJobOutput = RouterOutput['job']['add']
type DeleteJobOutput = RouterOutput['job']['delete']

export function useJobAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: JobAddInput) => useAsyncData<CreateJobOutput, ErrorOutput>(() => $client.job.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['job', 'list'])
      const previousJobs = vueQueryClient.getQueryData(['job', 'list'])
      const newJob = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['job', 'list'],
        (old) => {
          return old ? [newJob, ...old] : undefined
        },
      )

      return { previousJobs }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['job', 'list'] }),
  })
}

export function useJobList(input: JobListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.job.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['job', 'list', input], queryFn })
}

export function useJobDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: JobDeleteInput) => {
    return useAsyncData<DeleteJobOutput, ErrorOutput>
    (
      () => $client.job.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['job', 'list'])
      const previousJobs = vueQueryClient.getQueryData(['job', 'list'])

      vueQueryClient.setQueryData(['job', 'list'], (old) => {
        return old ? old?.filter(job => job.id !== id) : undefined
      })

      return { previousJobs }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['job', 'list'], context?.previousJobs)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['job', 'list'] }),
  })
}

export function useJobGetById(input: JobGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.job.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['job', 'getById', input], queryFn })
}
