<script setup lang="ts">
const BID = '81976'
const NAME = 'sunzha'

</script>

<template>
  <div grid grid-cols-3>
    <aside col-span-1>
      <ProfileCard :bid="BID" :name="NAME" />
    </aside>
    <PostList :bid="BID" />
  </div>
</template>
