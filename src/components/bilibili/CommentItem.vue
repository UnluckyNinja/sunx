<script lang="ts" setup>import { useTimeAgoCN } from '~/composables'

const props = defineProps<{
  comment: {
    avatar: string
    content: string
    name: string
    time: number
    stats: {
      like: number
    }
  }
}>()
const timeAgo = useTimeAgoCN(props.comment.time * 1000, {
  max: 'hour',
})
</script>

<template>
  <div grid grid-cols-6>
    <div col-span-1>
      <img w="3/4" object-cover m-auto rounded-full :src="props.comment.avatar" referrerpolicy="no-referrer">
    </div>
    <div col-span-5 px-2 text-left space-y-1>
      <div class="font-bold" text="gray-500 dark:gray-400">
        {{ props.comment.name }}
      </div>
      <div>{{ props.comment.content }}</div>
      <div flex text="gray-500 dark:gray-400">
        <div mr-4>
          {{ timeAgo }}
        </div>
        <div flex items-center justify-center>
          <div inline-block i-carbon-thumbs-up />
          <div ml-1>
            {{ props.comment.stats.like }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
