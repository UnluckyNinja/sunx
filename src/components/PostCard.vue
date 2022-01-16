<script lang="ts" setup>
import { useTimeAgoCN } from '~/composables'
const props = defineProps<{
  post: {
    id: string
    oid: string
    content: string
    time: number
    stats: {
      repost: number
      comment: number
      like: number
    }
    isSpaceTop: boolean
    pictures: {
      img_height: number
      img_size: number
      img_src: string
      img_width: number
    }[]
  }
}>()
const timeAgo = useTimeAgoCN(props.post.time * 1000, {
  max: 'hour',
})

const [showComments, toggleComments] = useToggle()
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
      flex items-stretch
    >
      <div v-if="props.post.isSpaceTop" w-5 h-5 i-carbon-pin text-pink-400 mx-1 />
      <a :href="'https://t.bilibili.com/'+props.post.id+'?tab=2'" target="_blank">
        {{ timeAgo }}
      </a>
    </div>
    <div text-left leading-relaxed>
      {{ props.post.content }}
    </div>
    <ImageGrid v-if="props.post.pictures" my-4 :pictures="props.post.pictures" />
    <div mt-4 grid grid-cols-3 text-xl>
      <div col-span-1 flex items-center justify-center>
        <div inline-block i-carbon-reset-alt />
        <div ml-2>
          {{ props.post.stats.repost }}
        </div>
      </div>
      <button col-span-1 flex items-center justify-center @click="toggleComments()">
        <div inline-block i-carbon-chat />
        <div ml-2>
          {{ props.post.stats.comment }}
        </div>
      </button>
      <div col-span-1 flex items-center justify-center>
        <div inline-block i-carbon-thumbs-up />
        <div ml-2>
          {{ props.post.stats.like }}
        </div>
      </div>
    </div>
    <CommentList v-if="showComments" mt-4 :oid="props.post.oid" :postid="props.post.id" />
  </div>
</template>
