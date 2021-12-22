<script lang="ts" setup>
const props = withDefaults(defineProps<{
  src: string
}>(), {
  src: 'https://i1.hdslb.com/bfs/face/497691f8ce249f9fde224ecb5f3b5860145b035c.jpg',
})
</script>

<template>
  <img w-24 h-24 rounded-full referrerpolicy="no-referrer" :src="props.src">
</template>
