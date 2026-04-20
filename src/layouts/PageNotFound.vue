<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
</script>

<template>
  <Empty class="h-svh bg-white">
    <EmptyHeader>
      <EmptyMedia class="w-full">
        <div class="mb-12">
          <img
            src="/src/assets/404.png"
            alt="Image"
          >
        </div>
      </EmptyMedia>
      <EmptyTitle class="text-muted-foreground">
        Oops! Halaman Tidak Ditemukan
      </EmptyTitle>
    </EmptyHeader>
    <EmptyContent>
      <div class="flex gap-2">
        <Button>
          <a href="/">
            Kembali
          </a>
        </Button>
      </div>
    </EmptyContent>
  </Empty>
</template>
