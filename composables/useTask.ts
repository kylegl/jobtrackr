import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { TaskAddInput, TaskDeleteInput, TaskGetByIdInput, TaskListInput } from '~~/server/trpc/router/routes/taskRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateTaskOutput = RouterOutput['task']['add']
type DeleteTaskOutput = RouterOutput['task']['delete']

export function useTaskAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: TaskAddInput) => useAsyncData<CreateTaskOutput, ErrorOutput>(() => $client.task.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['task', 'list'])
      const previousTasks = vueQueryClient.getQueryData(['task', 'list'])
      const newTask = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['task', 'list'],
        (old) => {
          return old ? [newTask, ...old] : undefined
        },
      )

      return { previousTasks }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['task', 'list'] }),
  })
}

export function useTaskList(input: TaskListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.task.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['task', 'list', input], queryFn })
}

export function useTaskDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: TaskDeleteInput) => {
    return useAsyncData<DeleteTaskOutput, ErrorOutput>
    (
      () => $client.task.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['task', 'list'])
      const previousTasks = vueQueryClient.getQueryData(['task', 'list'])

      vueQueryClient.setQueryData(['task', 'list'], (old) => {
        return old ? old?.filter(task => task.id !== id) : undefined
      })

      return { previousTasks }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['task', 'list'], context?.previousTasks)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['task', 'list'] }),
  })
}

export function useTaskGetById(input: TaskGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.task.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['task', 'getById', input], queryFn })
}
