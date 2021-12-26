<script lang="ts" setup>
import { useTimeAgoCN } from '~/composables'
const props = defineProps<{
  post: {
    id: string
    content: string
    time: number
    stats: {
      repost: number
      comment: number
      like: number
    }
  }
}>()
const timeAgo = useTimeAgoCN(props.post.time * 1000, {
  max: 'hour',
})
</script>

<template>
  <div p-4 rounded-3xl bg-gray-100 dark:bg-gray-800>
    <div
      mb-2
      text-left
      text-gray-500
      dark:text-gray-200
      text-sm
      leading-relaxed
    >
      <a :href="'https://t.bilibili.com/'+props.post.id+'?tab=2'" target="_blank">
        {{ timeAgo }}
      </a>
    </div>
    <div text-left leading-relaxed>
      {{ props.post.content }}
    </div>
    <div mt-4 grid grid-cols-3>
      <div col-span-1>
        <div inline-block i-carbon-reset-alt />
        {{ props.post.stats.repost }}
      </div>
      <div col-span-1>
        <div inline-block i-carbon-chat />
        {{ props.post.stats.comment }}
      </div>
      <div col-span-1>
        <div inline-block i-carbon-thumbs-up />
        {{ props.post.stats.like }}
      </div>
    </div>
  </div>
</template>
