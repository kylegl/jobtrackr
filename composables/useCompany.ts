import type { TRPCClientError } from '@trpc/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { inferRouterOutputs } from '@trpc/server'
import type { CompanyAddInput, CompanyDeleteInput, CompanyGetByIdInput, CompanyListInput } from '~~/server/trpc/router/routes/companyRouter'
import type { AppRouter } from '~~/server/trpc/router/appRouter'

type RouterOutput = inferRouterOutputs<AppRouter>
type ErrorOutput = TRPCClientError<AppRouter>
type CreateCompanyOutput = RouterOutput['company']['add']
type DeleteCompanyOutput = RouterOutput['company']['delete']

export function useCompanyAdd() {
  const vueQueryClient = useQueryClient()
  const { $client } = useNuxtApp()
  const mutationFn = (input: CompanyAddInput) => useAsyncData<
    CreateCompanyOutput,
    ErrorOutput
  >(() => $client.company.add.mutate(input))

  return useMutation({
    mutationFn,
    onMutate: async (input) => {
      await vueQueryClient.cancelQueries(['company', 'list'])
      const previousCompanies = vueQueryClient.getQueryData(['company', 'list'])
      const newCompany = {
        id: '__temp__id',
        createdAt: new Date(),
        ...input,
      }

      vueQueryClient.setQueryData(['company', 'list'],
        (old) => {
          return old ? [newCompany, ...old] : undefined
        },
      )

      return { previousCompanies }
    },
    onSuccess: () => vueQueryClient.invalidateQueries({ queryKey: ['company', 'list'] }),
  })
}

export function useCompanyList(input: CompanyListInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.company.list.useQuery(input)
    return data
  }
  return useQuery({ queryKey: ['company', 'list', input], queryFn })
}

export function useCompanyDelete() {
  const { $client } = useNuxtApp()
  const vueQueryClient = useQueryClient()

  const mutationFn = async (input: CompanyDeleteInput) => {
    return useAsyncData<DeleteCompanyOutput, ErrorOutput>
    (
      () => $client.company.delete.mutate(input),
    )
  }

  return useMutation({
    mutationFn,
    onMutate: async ({ id }) => {
      await vueQueryClient.cancelQueries(['company', 'list'])
      const previousCompanies = vueQueryClient.getQueryData(['company', 'list'])

      vueQueryClient.setQueryData(['company', 'list'], (old) => {
        return old ? old?.filter(company => company.id !== id) : undefined
      })

      return { previousCompanies }
    },
    onError: (err, { id }, context) => {
      vueQueryClient.setQueryData(['company', 'list'], context?.previousCompanies)
      return err
    },
    onSettled: () => vueQueryClient.invalidateQueries({ queryKey: ['company', 'list'] }),
  })
}

export function useCompanyGetById(input: CompanyGetByIdInput) {
  const { $client } = useNuxtApp()

  const queryFn = async () => {
    const { data } = await $client.company.getById.useQuery(input)
    return data
  }

  return useQuery({ queryKey: ['company', 'getById', input], queryFn })
}
