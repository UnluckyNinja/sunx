<script lang="ts" setup>

</script>

<template>
  <main font-sans h-screen flex flex-col items-stretch text="center gray-700 dark:gray-200">
    <router-view flex-1 overflow-auto />
    <Footer flex-none self-center />
  </main>
</template>
