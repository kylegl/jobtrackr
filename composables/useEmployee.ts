import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type {
  EmployeeAddInput,
  EmployeeDeleteInput,
  EmployeeGetByIdInput,
  EmployeeListInput,
  EmployeeUpdateInput,
} from '~~/server/trpc/schemas'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateEmployeeOutput = RouterOutput['employee']['add']
type DeleteEmployeeOutput = RouterOutput['employee']['delete']
type UpdateEmployeeOutput = RouterOutput['employee']['update']
type GetEmployeeByIdOutput = RouterOutput['employee']['getById']

export function useEmployeeAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: EmployeeAddInput) => useAsyncData<CreateEmployeeOutput, ErrorOutput>(() => $client.employee.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['employee', 'list'])
      const previousEmployees = vueQueryClient.getQueryData(['employee', 'list'])
      const newEmployee = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['employee', 'list'],
        (old: any) => {
          return old ? [newEmployee, ...old] : undefined
        },
      )

      return { previousEmployees }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['employee', 'list'] }),
  })
}

export function useEmployeeList(input: EmployeeListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data, error } = await $client.employee.list.useQuery(input)
    return { data, error }
  }
  return useQuery({ queryKey: ['employee', 'list', input], queryFn })
}

export function useEmployeeDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: EmployeeDeleteInput) => {
    return useAsyncData<DeleteEmployeeOutput, ErrorOutput>
    (
      () => $client.employee.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['employee', 'list'])
      const previousEmployees = vueQueryClient.getQueryData(['employee', 'list'])

      vueQueryClient.setQueryData(['employee', 'list'], (old) => {
        return old ? old?.filter(employee => employee.id !== id) : undefined
      })

      return { previousEmployees }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['employee', 'list'], context?.previousEmployees)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['employee', 'list'] }),
  })
}

export function useEmployeeGetById(input: EmployeeGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.employee.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['employee', 'getById', input], queryFn })
}

export function useEmployeeUpdate() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  async function mutationFn(updatedEmployee: EmployeeUpdateInput) {
    useAsyncData<
      UpdateEmployeeOutput,
      ErrorOutput
    >(() => $client.employee.update.mutate(updatedEmployee))
  }

  return useMutation({
    mutationFn,
    onMutate: async (updatedEmployee) => {
      await vueQueryClient.cancelQueries(['employee'])
      const previousEmployee = vueQueryClient
        .getQueryData<GetEmployeeByIdOutput>(['employee', 'getById', updatedEmployee.id])

      vueQueryClient.setQueryData(
        ['employee', 'getById', updatedEmployee.id],
        updatedEmployee,
      )

      return { previousEmployee, updatedEmployee }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['employee', 'getById', id], context?.previousEmployee)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['employee'] }),
  })
}
