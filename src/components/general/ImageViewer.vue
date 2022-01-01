<script lang="ts" setup>
const props = withDefaults(defineProps<{
  picture: {
    img_height: number
    img_size: number
    img_src: string
    img_width: number
  }
  rightShift?: boolean
  leftShift?: boolean
}>(), {
  rightShift: false,
  leftShift: false,
})

const imageEle = ref<HTMLImageElement>()
const imageWrapper = ref<HTMLDivElement>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'right-shift'): void
  (e: 'left-shift'): void
}>()

function openImage() {
  open(props.picture.img_src)
}

const angleClasses = [
  'rotate-0',
  'rotate-90',
  'rotate-180',
  'rotate-270',
]
const ri = ref(0)
const rotateIndex = computed({
  get: () => ri.value,
  set: (val) => {
    ri.value = ((val % 4) + 4) % 4
  },
})
const scaleValue = ref(1)
watch([scaleValue, imageEle], ([newVal]) => {
  if (!imageEle.value) return
  imageEle.value.style.setProperty('--un-scale-x', `${newVal}`)
  imageEle.value.style.setProperty('--un-scale-y', `${newVal}`)
  imageEle.value.style.setProperty('--un-scale-z', `${newVal}`)
})
watch([ri, toRef(props, 'picture')], ([newVal, newPic]) => {
  // wrapperW / wrapperH = rotatedW / rotatedH
  nextTick(() => {
    if (!imageEle.value || !imageWrapper.value) return
    let iw = imageEle.value.clientWidth
    let ih = imageEle.value.clientWidth * (newPic.img_height / newPic.img_width)
    const ew = imageEle.value.clientWidth

    if (newVal % 2 === 0) {
      imageWrapper.value.style.height = `${ih / iw * ew}px`
      scaleValue.value = 1
    }
    else {
      [iw, ih] = [ih, iw]
      imageWrapper.value.style.height = `${ih / iw * ew}px`
      scaleValue.value = ew / iw
    }
  })
}, { deep: true, flush: 'post' })

const angle = computed(() => {
  return angleClasses[rotateIndex.value]
})

</script>

<template>
  <div flex flex-col>
    <div flex justify-between text-sm p-1>
      <button flex @click="emit('close')">
        <div i-carbon-back-to-top />收起
      </button>
      <button flex @click="openImage()">
        <div i-carbon-launch />打开原图
      </button>
      <!-- <button flex>
        <div i-carbon-fit-to-screen />全屏查看
      </button> -->
      <button flex @click="rotateIndex += 1">
        <div i-carbon-rotate-clockwise /> 顺时针旋转
      </button>
      <button flex @click="rotateIndex -= 1">
        <div i-carbon-rotate-counterclockwise />逆时针旋转
      </button>
    </div>
    <div ref="imageWrapper" flex justify-center relative overflow-hidden border-px>
      <img
        ref="imageEle" object-cover
        :class="[angle]" referrerpolicy="no-referrer" :src="props.picture.img_src"
      >
      <div grid grid-cols-4 absolute inset-0 place-items-center text-6xl cursor-zoom-out @click="emit('close')">
        <div
          :class="[props.leftShift ? '' : 'invisible']"
          col-span-1
          w-full h-full
          flex items-center justify-center
          bg-gray-100
          transition
          hover="bg-opacity-40 op-100"
          op0 bg-opacity-0
          cursor-pointer
          @click.stop="emit('left-shift')"
        >
          <div i-carbon-chevron-left font-bold />
        </div>
        <div w-full h-full col-span-2 op-0 />
        <div
          :class="[props.rightShift ? '' : 'invisible']"
          col-span-1
          w-full h-full
          flex items-center justify-center
          bg-gray-100
          transition
          hover="bg-opacity-40 op-100"
          op0 bg-opacity-0
          cursor-pointer
          @click.stop="emit('right-shift')"
        >
          <div i-carbon-chevron-right font-bold />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Due to a bug with "vercel dev" and Vite,
   sfc <style> can't be correctly transformed */
/* .use-scale {
  --un-scale-x: v-bind('scaleValue');
  --un-scale-y: v-bind('scaleValue');
  --un-scale-z: v-bind('scaleValue');
} */
</style>
