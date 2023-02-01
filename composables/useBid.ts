import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { BidAddInput, BidDeleteInput, BidGetByIdInput, BidListInput } from '~~/server/trpc/router/routes/bidRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateBidOutput = RouterOutput['bid']['add']
type DeleteBidOutput = RouterOutput['bid']['delete']

export function useBidAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: BidAddInput) => useAsyncData<CreateBidOutput, ErrorOutput>(() => $client.bid.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['bid', 'list'])
      const previousBids = vueQueryClient.getQueryData(['bid', 'list'])
      const newBid = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['bid', 'list'],
        (old) => {
          return old ? [newBid, ...old] : undefined
        },
      )

      return { previousBids }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['bid', 'list'] }),
  })
}

export function useBidList(input: BidListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.bid.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['bid', 'list', input], queryFn })
}

export function useBidDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: BidDeleteInput) => {
    return useAsyncData<DeleteBidOutput, ErrorOutput>
    (
      () => $client.bid.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['bid', 'list'])
      const previousBids = vueQueryClient.getQueryData(['bid', 'list'])

      vueQueryClient.setQueryData(['bid', 'list'], (old) => {
        return old ? old?.filter(bid => bid.id !== id) : undefined
      })

      return { previousBids }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['bid', 'list'], context?.previousBids)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['bid', 'list'] }),
  })
}

export function useBidGetById(input: BidGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.bid.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['bid', 'getById', input], queryFn })
}
