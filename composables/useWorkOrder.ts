import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { WorkOrderAddInput, WorkOrderDeleteInput, WorkOrderGetByIdInput, WorkOrderListInput } from '~~/server/trpc/router/routes/workOrderRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateWorkOrderOutput = RouterOutput['workOrder']['add']
type DeleteWorkOrderOutput = RouterOutput['workOrder']['delete']

export function useWorkOrderAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: WorkOrderAddInput) => useAsyncData<CreateWorkOrderOutput, ErrorOutput>(() => $client.workOrder.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['workOrder', 'list'])
      const previousWorkOrders = vueQueryClient.getQueryData(['workOrder', 'list'])
      const newWorkOrder = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['workOrder', 'list'],
        (old) => {
          return old ? [newWorkOrder, ...old] : undefined
        },
      )

      return { previousWorkOrders }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['workOrder', 'list'] }),
  })
}

export function useWorkOrderList(input: WorkOrderListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.workOrder.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['workOrder', 'list', input], queryFn })
}

export function useWorkOrderDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: WorkOrderDeleteInput) => {
    return useAsyncData<DeleteWorkOrderOutput, ErrorOutput>
    (
      () => $client.workOrder.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['workOrder', 'list'])
      const previousWorkOrders = vueQueryClient.getQueryData(['workOrder', 'list'])

      vueQueryClient.setQueryData(['workOrder', 'list'], (old) => {
        return old ? old?.filter(workOrder => workOrder.id !== id) : undefined
      })

      return { previousWorkOrders }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['workOrder', 'list'], context?.previousWorkOrders)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['workOrder', 'list'] }),
  })
}

export function useWorkOrderGetById(input: WorkOrderGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.workOrder.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['workOrder', 'getById', input], queryFn })
}

export function newWo(job: unknown) {
  const wo = {
    'wo_number': nextWoNumber.value,
    'FK|job_id': undefined,
    'FK|bid_id': undefined,
    'FK|client_id': undefined,
    'FK|contact_id': [],
    'FK|employee_id': [],
    'FK|property_id': undefined,
    'start_date': undefined,
    'due_date': undefined,
    'description': undefined,
    'property_info': undefined,
    'notes': undefined,
    'bill_type': undefined,
    'job_type': undefined,
    'created_at': +new Date(),
    'updated_at': null,
    'closed_at': null,
    'status': 'upcoming',
  } as WorkorderType

  if (job) {
    wo['FK|job_id'] = job.id
    wo['FK|bid_id'] = job['FK|bid_id']?.id
    wo['FK|client_id'] = job['FK|client_id'].id
    wo['FK|contact_id'] = job['FK|contact_id']?.length ? job['FK|contact_id']?.map(el => el.id) : []
  }

  return wo
}
