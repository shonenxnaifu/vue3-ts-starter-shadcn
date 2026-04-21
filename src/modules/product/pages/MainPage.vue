<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DataTable from '../components/datatable/DataTable.vue'
</script>

<template>
  <section class="mb-7" aria-labelledby="judul-monitoring">
    <h1 id="judul-monitoring" class="text-4xl font-semibold">
      Product Management
    </h1>
    <p class="text-muted-foreground">
      Show, Add, Delete, Edit Product
    </p>
  </section>
  <Card class="mt-4">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <span>Product List</span>
      </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-1 gap-5">
      <DataTable />
    </CardContent>
  </Card>
</template>
