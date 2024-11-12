<script setup lang="ts">
import {
  BarChart3,
  Users,
  DollarSign,
  ArrowUpRight,
  Clock,
} from 'lucide-vue-next';

const recentActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Created new account',
    time: '2 minutes ago',
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Completed purchase',
    time: '5 minutes ago',
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'Updated profile',
    time: '10 minutes ago',
  },
];

const stats = [
{
  title: 'Total Revenue',
  value: '$45,231.89',
  change: '+20.1%',
  icon: DollarSign,
},
{
  title: 'Active Users',
  value: '2,338',
  change: '+15.3%',
  icon: Users,
},
{
  title: 'Recent Sales',
  value: '432',
  change: '+12.5%',
  icon: BarChart3,
},
];
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-gray-900">
        Dashboard
      </h1>
      <p class="text-sm text-gray-500">
        Welcome back, here's what's happening today.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="bg-white p-6 rounded-lg shadow-sm"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="text-sm font-medium text-gray-600">
              {{ stat.title }}
            </p>
            <p class="text-2xl font-semibold text-gray-900 mt-1">
              {{ stat.value }}
            </p>
          </div>
          <div class="p-2 bg-gray-50 rounded-lg">
            <div class="h-5 w-5 text-gray-600">
              <component :is="stat.icon" />
            </div>
          </div>
        </div>
        <div class="flex items-center mt-4 text-sm">
          <div class="h-4 w-4 text-green-500 mr-1">
            <ArrowUpRight />
          </div>
          <span class="text-green-500 font-medium">{{ stat.change }}</span>
          <span class="text-gray-600 ml-1">from last month</span>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6">
        <h2 class="text-lg font-semibold text-gray-900">
          Recent Activity
        </h2>
        <div class="mt-6 space-y-4">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-gray-50 rounded-full">
                <div class="h-4 w-4 text-gray-600">
                  <Clock />
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ activity.user }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ activity.action }}
                </p>
              </div>
            </div>
            <span class="text-sm text-gray-500">{{ activity.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
