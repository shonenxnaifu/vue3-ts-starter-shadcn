<script setup lang="ts">
import DataTable from '@/modules/posts/components/datatable/DataTable.vue'

// const { data: posts, isLoading } = useGetPostQuery({ _page: 1, _limit: 10 })
</script>

<template>
  <!-- <span v-if="isLoading">Loading...</span>
  <div v-else>
    <pre>{{ posts }}</pre>
  </div> -->
  <DataTable />
</template>
