<script setup lang="ts">
const props = defineProps<{
  bid: string
}>()
const offset_dynamic_id = ref('0')
const postLink = computed(() => `/api/bilibili/user/${props.bid}/posts?offset_dynamic_id=${offset_dynamic_id.value}`)

const cards = ref<any[]>([])
const { data, isFinished } = useFetch(postLink, {
  refetch: true,
}).get().json<any>()

whenever(isFinished, () => {
  cards.value.push(...data.value.data.cards)
})
const loadTrigger = ref<HTMLDivElement | null>(null)
const trigger = ref(false)

useIntersectionObserver(
  loadTrigger,
  ([{ isIntersecting }], observerElement) => {
    trigger.value = isIntersecting
  },
)
whenever(trigger, () => {
  if (cards.value.length < 1) return
  offset_dynamic_id.value = cards.value[cards.value.length - 1].desc.dynamic_id_str
})

function cardToPost(card: any) {
  const cardJson = JSON.parse(card.card)
  return {
    id: card.desc.dynamic_id_str,
    content: cardJson.item.content ?? cardJson.item.description,
    time: card.desc.timestamp,
    stats: {
      repost: card.desc.repost,
      comment: card.desc.comment,
      like: card.desc.like,
    },
    isSpaceTop: card.extra.is_space_top,
    pictures: cardJson.item.pictures,
  }
}
</script>

<template>
  <div ref="listEle" space-y-4>
    <article v-for="(card, i) in cards" :key="i">
      <div>
        <PostCard :post="cardToPost(card)" />
      </div>
    </article>
    <div ref="loadTrigger">
      <div :class="[trigger? '': 'hidden']" inline-block mt-6 i-carbon-fade animate-spin />
    </div>
  </div>
</template>
