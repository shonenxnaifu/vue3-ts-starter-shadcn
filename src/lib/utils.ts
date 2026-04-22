import type { Updater } from '@tanstack/vue-table'
import type { ClassValue } from 'clsx'
import type { Ref } from 'vue'
import { DateFormatter } from '@internationalized/date'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref): void {
  ref.value = typeof updaterOrValue === 'function'
    ? updaterOrValue(ref.value)
    : updaterOrValue
}

export function formatCurrency(numVal: number): string {
  const formattedVal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(
    numVal,
  )

  return formattedVal
}

export function formatNumber(numVal: number): string {
  const formattedVal = new Intl.NumberFormat('id-ID', { style: 'decimal', minimumFractionDigits: 0 }).format(
    numVal,
  )

  return formattedVal
}

export function formatDate(dateVal: Date): string {
  const df = new DateFormatter('id-ID', {
    dateStyle: 'medium',
  })
  return df.format(dateVal)
}
