<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'
import type { Product } from '@/modules/product/types'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { computed, ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import { externalTooltipHandler } from './utils'

const props = defineProps<{
  dataProducts: Array<Product>
}>()

const dataProducts = ref<Array<Product>>([])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

interface ChartDataOpt {
  datas: ChartData<any>
  options: ChartOptions<'bar'>
}

const chartDataOpt = computed<ChartDataOpt>(() => {
  const chartResp = props.dataProducts

  const chartData: ChartData<any> = {
    labels: chartResp?.map(item => item.title),
    datasets: [{
      label: 'Price',
      type: 'bar',
      backgroundColor: 'rgba(36,99,235, 0.7)',
      yAxisID: 'y1',
      fill: false,
      data: chartResp.map(item => item.price) ?? [],
      parsing: {
        xAxisKey: 'display_label',
        yAxisKey: 'price_key',
      },
    }, {
      label: 'Stock',
      type: 'line',
      backgroundColor: 'rgba(151,76,237, 0.7)',
      borderColor: 'rgba(151,76,237)',
      tension: 0.4,
      pointRadius: '6',
      yAxisID: 'y2',
      fill: false,
      data: chartResp.map(item => item.stock) ?? [],
      parsing: {
        xAxisKey: 'display_label',
        yAxisKey: 'stock_key',
      },
    }],
  }

  const chartOpt: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        type: 'category',
        ticks: {
          align: 'center',
          maxRotation: 30,
          minRotation: 30,
          autoSkip: false,
        },
      },
      y1: {
        type: 'linear',
        display: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price',
          color: 'rgba(0,0,0)',
          font: {
            size: 14,
            style: 'normal',
          },
        },
      },
      y2: {
        type: 'linear',
        display: true,
        beginAtZero: true,
        position: 'right',
        title: {
          display: true,
          text: 'Stock',
          color: 'rgba(0,0,0)',
          font: {
            size: 14,
            style: 'normal',
          },
        },
      },
    },
    plugins: {
      tooltip: {
        titleColor: 'rgb(0,0,0,1)',
        bodyColor: 'rgb(0,0,0,1)',
        backgroundColor: 'rgb(255,255,255,1)',
        external: externalTooltipHandler,
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  }

  return {
    datas: chartData,
    options: chartOpt,
  }
})

watch(() => props.dataProducts, (newData) => {
  dataProducts.value = newData
}, { immediate: true })
</script>

<template>
  <div
    class="flex flex-row items-center w-full h-full"
  >
    <div class="relative w-full min-h-52">
      <Bar
        :data="JSON.parse(JSON.stringify(chartDataOpt.datas))"
        :options="chartDataOpt.options"
      />
    </div>
  </div>
</template>
