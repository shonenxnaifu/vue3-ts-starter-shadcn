<script setup lang="ts">
import LoginForm from '../components/form/LoginForm.vue'
</script>

<template>
  <div class="flex flex-1 items-center justify-center">
    <div class="w-full max-w-xs">
      <div class="flex mb-2">
        <img
          src="/src/assets/logo_brand.webp"
          alt="Image"
          class="h-16 object-contain dark:brightness-[0.2] dark:grayscale"
        >
      </div>
      <LoginForm />
    </div>
  </div>
</template>
