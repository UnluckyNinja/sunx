<script lang="ts" setup>import { useFetchComments } from '~/composables'

const props = defineProps<{
  postid: string
  oid: string
}>()

const { data: json, isFinished } = useFetchComments({ oid: props.oid })

const comments = computed(() => {
  if (!isFinished.value) return []
  return json.value.data.replies.map((it: any) => {
    return {
      avatar: it.member.avatar,
      name: it.member.uname,
      time: it.ctime,
      content: it.content.message,
      stats: {
        like: it.like,
      },
    }
  })
})
</script>

<template>
  <div v-if="isFinished" space-y-2>
    <CommentItem v-for="(v, i) in comments" :key="i" :comment="v" />
    <a block mt-4 :href="'https://t.bilibili.com/'+props.postid+'?tab=2'" target="_blank">
      点击查看更多评论（打开B站原帖地址）
    </a>
  </div>
  <div v-else>
    <div inline-block mt-6 i-carbon-fade animate-spin />
  </div>
</template>
