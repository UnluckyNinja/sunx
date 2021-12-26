<script lang="ts" setup>
const props = withDefaults(defineProps<{
  src: string
  width?: string
  height?: string
}>(), {
  src: 'https://i1.hdslb.com/bfs/face/497691f8ce249f9fde224ecb5f3b5860145b035c.jpg',
})

const sizeClass = computed(() => {
  if (props.width && props.height) return `${props.width} ${props.height}`
  return 'w-16 h-16'
})

</script>

<template>
  <img class="rounded-full" :class="sizeClass" referrerpolicy="no-referrer" :src="props.src">
</template>
