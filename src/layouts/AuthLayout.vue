<script setup lang="ts">
</script>

<template>
  <div class="grid min-h-svh lg:grid-cols-2 p-5">
    <div class="relative hidden lg:block overflow-hidden">
      <img
        src="/src/assets/logo_login.webp"
        alt="Image"
        class="absolute h-2/3 w-2/3 inset-0 object-contain dark:brightness-[0.2] dark:grayscale rounded-xl self-center mx-auto"
      >
    </div>
    <div class="flex flex-col gap-4 p-10 bg-gray-200 rounded-xl">
      <slot />
    </div>
  </div>
</template>
