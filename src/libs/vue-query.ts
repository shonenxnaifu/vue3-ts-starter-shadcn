import type {
  DefaultOptions,
  UseMutationOptions,
  UseQueryOptions,
  VueQueryPluginOptions,
} from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import {
  MutationCache,
  QueryClient,
} from '@tanstack/vue-query'

const queryConfig: DefaultOptions = {
  queries: {
    staleTime: 2000,
    retry: 0,
    refetchOnWindowFocus: false,
  },
}

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: queryConfig,
  },
}

const mutationCache: MutationCache = new MutationCache()

export const queryClient = new QueryClient({ defaultOptions: queryConfig, mutationCache })

export type ExtractFnReturnType<FnType extends (...args: unknown[]) => unknown> = Awaited<
  ReturnType<FnType>
>

export type QueryConfig<QueryFnType extends (...args: unknown[]) => unknown> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>

export type MutationConfig<MutationFnType extends (...args: unknown[]) => unknown>
  = UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >
