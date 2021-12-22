<script lang="ts" setup>

</script>

<template>
  <div min-w-96 inline-block p-4>
    <div flex place-items-center mb-10>
      <Avatar />
      <p flex-1 text-4xl>
        <strong>孙渣</strong>
      </p>
    </div>
    <div text-2xl space-y-4 text-left pl-8>
      <div rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700>
        <a p-4 block href="https://space.bilibili.com/81976/dynamic" target="_blank" rel="noopener">
          <div text-blue i-simple-icons-bilibili inline-block align-text-bottom mr-8 />孙渣
          <div inline-block align-text-bottom float-right i-carbon-launch />
        </a>
      </div>
      <div rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700>
        <a p-4 block href="https://weibo.com/u/6507947437" target="_blank" rel="noopener">
          <div text-red-600 i-simple-icons-sinaweibo inline-block align-text-bottom mr-8 />子小氵查(灵媒)
          <div inline-block align-text-bottom float-right i-carbon-launch />
        </a>
      </div>
    </div>
  </div>
</template>
