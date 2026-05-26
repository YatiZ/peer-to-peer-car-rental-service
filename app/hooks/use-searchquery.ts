'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export default function useSearchQuery(): [
  Record<string, string>,
  (params: Record<string, string | number | null>) => void,
] {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const queryParams = Object.fromEntries(searchParams.entries())

  const setQueryParams = (
    params: Record<string, string | number | null>,
  ) => {
    const current = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key)
      } else {
        current.set(key, String(value))
      }
    })

    router.push(`${pathname}?${current.toString()}`)
  }

  return [queryParams, setQueryParams]
}