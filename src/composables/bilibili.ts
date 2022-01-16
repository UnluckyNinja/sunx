import type { UseFetchOptions } from '@vueuse/core'

function useFetchJson<T = any>(url: string, options: UseFetchOptions = {}) {
  return useFetch(url, options).get().json<T>()
}

export function useFetchComments<T = any>(payload: {oid: string; page?: number}, options: UseFetchOptions = {}) {
  const page = payload.page ?? 0
  return useFetchJson<T>(`/api/bilibili/comment/${payload.oid}/${page}`, options)
}
