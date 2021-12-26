<template>
  <div space-y-20 p-20>
    <div text-6xl font-black>
      404
    </div>
    <div>
      你看下地址是不是写错了？
    </div>
    <div>
      <router-link text-2xl font- to="/">
        <button
          px-8
          py-4
          bg-gray-200
          dark:bg-gray-700
          rounded-xl
          hover:bg-gray-400
        >
          回到主页
        </button>
      </router-link>
    </div>
  </div>
</template>
