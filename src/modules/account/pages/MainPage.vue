<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useAccountProfile } from '../composables/useAccountProfileQuery'

const { data: accountData, isFetching } = useAccountProfile()
</script>

<template>
  <div class="mb-7 flex items-center gap-4">
    <h1 class="text-4xl font-semibold">
      Account User
    </h1>
  </div>
  <Skeleton v-if="isFetching" class="h-40 w-full" />
  <Card v-else class="border border-red-900 bg-red-100/30 mb-5">
    <CardContent class="flex justify-between gap-5">
      <div class="border border-slate-900 rounded-lg">
        <Avatar class="h-full w-full rounded-lg">
          <AvatarImage v-if="accountData?.image" :src="accountData.image" :alt="accountData?.firstName" />
          <AvatarFallback class="rounded-lg">
            A
          </AvatarFallback>
        </Avatar>
      </div>
      <div class="grid grid-cols-3 gap-5">
        <div>
          <p class="text-muted-foreground">
            First Name
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.firstName }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Last Name
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.lastName }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Age
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.age }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Birth Date
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.birthDate }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Blood Group
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.bloodGroup }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Gender
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.gender }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Email
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.email }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Phone
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.phone }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
  <Skeleton v-if="isFetching" class="h-40 w-full" />
  <Card v-else class="border border-red-900 bg-red-100/30">
    <CardHeader>
      <CardTitle>Company</CardTitle>
      <CardDescription>Company Details</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-3 gap-5">
        <div>
          <p class="text-muted-foreground">
            Company Name
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.company.name }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Department
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.company.department }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Title
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.company.title }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Address
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.company.address.address }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            City
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.company.address.city }}
          </p>
        </div>
        <div>
          <p class="text-muted-foreground">
            Country
          </p>
          <p class="text-lg font-semibold">
            {{ accountData?.company.address.country }}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
