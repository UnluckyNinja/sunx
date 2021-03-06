<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'

const BID = '81976'
const NAME = 'sunzha'

const { data: biliInfo } = useFetch(`/api/bilibili/user/${BID}`).get().json<any>()
const { data: cmsInfo } = useFetch(`/api/cms/user/${NAME}`).get().json()

provide('cmsInfo', cmsInfo)
provide('biliInfo', computed(() => biliInfo.value?.data))

const [isAsideShown, toggleAside] = useToggle(false)
const modal = ref(null)

onClickOutside(modal, (e) => {
  if (isAsideShown.value) toggleAside()
})

</script>

<template>
  <div h-screen p-4 pt-20 lg:pt-4 lg:grid lg:grid-cols-7>
    <!-- Mobile -->
    <!-- aside modal -->
    <div
      :class="{
        'invisible': !isAsideShown,
        'bg-opacity-50 dark:bg-opacity-50': isAsideShown,
        'bg-opacity-0 dark:bg-opacity-0': !isAsideShown
      }"
      fixed
      inset-0
      w-full
      h-full
      z-20
      bg-gray-700
      dark:bg-gray-400
      transition-all
      duration-150
    >
      <div
        ref="modal"
        class="bg-gray-200 dark:bg-gray-800 h-full w-4/5"
        :class="['transition-transform transform', !isAsideShown ? '-translate-x-full' : '']"
        lg:hidden
      >
        <div flex justify="start">
          <button @click="toggleAside()">
            <div m-2 w-12 h-12 i-carbon-chevron-left />
          </button>
        </div>
        <aside>
          <ProfileCard text-sm :bid="BID" :name="NAME" />
        </aside>
      </div>
    </div>
    <nav
      class="fixed top-0 pt-5px left-0 z-10 right-0 h-16 flex bg-gray-300 dark:bg-gray-700
      lg:hidden"
    >
      <div flex-1 flex items-center pl-4>
        <Avatar width="w-12" height="h-12" :src="biliInfo?.data.face" @click="toggleAside()" />
      </div>
      <div flex-1 flex place-content-center items-center>
        <div text-2xl font-bold whitespace-nowrap>
          {{ biliInfo?.data.name }} 的B站动态
        </div>
      </div>
      <div flex-1 flex class="justify-end pr-4">
        <button class="!outline-none icon-btn" @click="toggleDark()">
          <div v-if="isDark" i-carbon-moon w-8 h-8 />
          <div v-else i-carbon-sun w-8 h-8 />
        </button>
      </div>
      <!-- gradient -->
      <div
        absolute
        top-full
        h-10px
        w-full
        bg-gradient-to-b
        from-gray-300
        dark:from-gray-700
        to-transparent
      />
    </nav>
    <!-- desktop -->
    <aside
      class="hidden lg:block
        lg:col-span-2 lg:static lg:h-auto lg:left-0"
    >
      <ProfileCard :bid="BID" :name="NAME" />
    </aside>
    <PostList lg:col-span-3 :bid="BID" />
    <div hidden lg:block mx-4 lg:col-span-2>
      <div flex mb-4 class="place-content-end">
        <button flex-0 block class="!outline-none icon-btn" @click="toggleDark()">
          <div v-if="isDark" i-carbon-moon w-8 h-8 />
          <div v-else i-carbon-sun w-8 h-8 />
        </button>
      </div>
      <LiveStatusCard class="hover:bg-gray-200 dark:hover:bg-gray-700" />
    </div>
  </div>
</template>
