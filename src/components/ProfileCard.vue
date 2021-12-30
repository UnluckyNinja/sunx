<script lang="ts" setup>
import type { Ref } from 'vue'

const props = defineProps<{
  bid: string
  name: string
}>()

const cmsInfo: any = inject('cmsInfo')
const biliInfo: any = inject('biliInfo')

const links: Ref<{ url: string; name: string }[]> = computed(() => cmsInfo.value ? cmsInfo.value.story.content.links : [])

const iconMap = {
  'weibo.com': 'i-simple-icons-sinaweibo text-red-600',
  'bilibili.com': 'i-simple-icons-bilibili text-blue',
  'afdian.net': 'i-carbon-fish-multiple text-pink',
}

function getIconForUrl(url: string) {
  const hostname = new URL(url).hostname
  for (const [site, attr] of Object.entries(iconMap)) {
    if (hostname.includes(site))
      return attr
  }
  return 'i-carbon-link'
}

</script>

<template>
  <div w-full p-4>
    <div flex place-items-center mb-10>
      <Avatar :src="biliInfo?.face" />
      <p flex-1 text-2xl>
        <strong>{{ biliInfo?.name }}</strong>
      </p>
    </div>
    <div v-if="links.length > 0" space-y-4 text-left pl-4>
      <div v-for="(link, i) in links" :key="i">
        <div rounded-xl hover:bg-gray-200 class="dark:hover:bg-gray-700">
          <a p-3 block :href="link.url" target="_blank" rel="noopener">
            <div
              :class="{ [getIconForUrl(link.url)]: true }"
              inline-block
              align-text-bottom
              mr-4
            />
            {{ link.name }}
            <div inline-block align-text-bottom float-right i-carbon-launch />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
