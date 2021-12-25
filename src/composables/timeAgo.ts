import type { MaybeRef, Pausable, UseTimeAgoOptions } from '@vueuse/core'
import type { ComputedRef } from 'vue'

export function useTimeAgoCN(time: MaybeRef<Date | number | string>, options?: UseTimeAgoOptions<false>): ComputedRef<string>
export function useTimeAgoCN(time: MaybeRef<Date | number | string>, options: UseTimeAgoOptions<true>): { timeAgo: ComputedRef<string> } & Pausable
export function useTimeAgoCN(time: MaybeRef<Date | number | string>, options: UseTimeAgoOptions<boolean> = { controls: false }) {
  options = {
    ...options,
    messages: {
      justNow: '刚刚',
      past: n => n.match(/\d/) ? `${n}前` : n,
      future: n => n.match(/\d/) ? `${n}后` : n,
      month: n => `${n} 个月`,
      year: n => `${n} 年`,
      day: n => `${n} 天`,
      week: n => `${n} 周`,
      hour: n => `${n} 小时`,
      minute: n => `${n} 分`,
      second: n => `${n} 秒`,
    },
  }
  if (options.controls)
    return useTimeAgo(time, options as UseTimeAgoOptions<true>)
  else
    return useTimeAgo(time, options as UseTimeAgoOptions<false>)
}
