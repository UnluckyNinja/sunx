<script lang="ts" setup>

const biliInfo: any = inject('biliInfo')

const isStreaming = computed(() => {
  return biliInfo.value?.live_room.liveStatus
})

const cover = computed(() => {
  return biliInfo.value?.live_room.cover
})
</script>

<template>
  <a
    block
    p-2
    :href="biliInfo?.live_room.url"
    rel="noreferrer"
    target="_blank"
  >
    <div
      relative
    >
      <img rounded referrerpolicy="no-referrer" :src="cover">
      <div absolute bottom-0 left-0 m-2 bg-red-400 px-2 rounded>
        <div v-if="isStreaming" flex items-center animate-pulse>
          <div i-carbon-video-filled />直播中
          <div i-carbon-overflow-menu-horizontal />
        </div>
        <div v-else>
          <div i-carbon-video-off />未直播
        </div>
      </div>
      <div flex items-center absolute bottom-0 right-0 m-2 class="bg-gray-300 dark:bg-gray-600 op80" px-2 rounded>
        <div i-carbon-view-filled />
        {{ biliInfo?.live_room.online }}</div>
    </div>
    <div text-3xl mt-4 font-bold>
      <span v-if="isStreaming">
        标题：{{ biliInfo?.live_room.title }}
      </span>
      <span v-else>
        未开播
      </span>
    </div>
  </a>
</template>
