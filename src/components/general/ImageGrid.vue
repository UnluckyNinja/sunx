<script lang="ts" setup>
const props = defineProps<{
  pictures: {
    img_height: number
    img_size: number
    img_src: string
    img_width: number
  }[]
}>()

const [isViewing, toggleView] = useToggle(false)

const imageIndex = ref(0)
const root = ref<HTMLDivElement | null>(null)
const targetIsVisible = ref(false)
useIntersectionObserver(
  root,
  ([{ isIntersecting }], observerElement) => {
    targetIsVisible.value = isIntersecting
  },
)

watch(isViewing, (newVal) => {
  if (newVal === true) return
  const stop = watch(targetIsVisible, (newVis) => {
    if (root.value && !newVis) {
      root.value.scrollIntoView()
      stop()
    }
  })
  setTimeout(stop, 50)
}, { flush: 'post' })
</script>

<template>
  <div ref="root" relative>
    <div v-show="!isViewing" grid grid-cols-3 gap-1>
      <div v-for="pic, i in props.pictures" :key="i" w-full pt-full relative overflow-hidden @click="imageIndex = i; toggleView()">
        <div absolute inset-0 cursor-zoom-in>
          <img w-full h-full object-cover :src="pic.img_src" referrerpolicy="no-referrer">
        </div>
      </div>
    </div>
    <ImageViewer
      v-show="isViewing"
      :picture="props.pictures[imageIndex]"
      :left-shift="imageIndex > 0"
      :right-shift="imageIndex < props.pictures.length - 1"
      @close="isViewing = false"
      @left-shift="imageIndex = Math.max(0, imageIndex-1)"
      @right-shift="imageIndex = Math.min(props.pictures.length-1, imageIndex+1)"
    />
  </div>
</template>
