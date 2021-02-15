<template>
  <ul class="px-3 pt-1 pb-2 overflow-y-auto">
    <li class="mt-2">
      <nuxt-link
        class="flex flex-col justify-between p-5 bg-gray-100 rounded-lg dark:bg-gray-200"
        to="/home"
        @click.self.native="notImplemented(), (event) => event.preventDefault()"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between capitalize dark:text-gray-700 mb-2"
        >
          <!-- Top section -->

          <span class="font-bold text-xl">{{ activityName }}</span>

          <div class="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-1 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"
              />
            </svg>
            <span>{{ className }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 ml-3 mr-1 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>

            <span>{{ classTopic }}</span>
          </div>
        </div>

        <TimeProgressCircle
          :radius="80"
          :stroke="10"
          :custom-class="'text-purple-500 text-lg font-bold'"
        />
        <!-- <ProgressCircle
          :radius="80"
          :stroke="10"
          :progress="progress"
          :custom-class="'text-purple-500 text-lg font-bold'"
        />
        <input v-model="progress" type="number" /> -->
        <slot></slot>

        <div class="flex justify-between text-gray-500 mt-2">
          <div class="flex italic">
            {{ startTime.toLocaleDateString(locale, options) }}
            -
            {{ endTime.toLocaleDateString(locale, options) }}
          </div>

          <!-- <p class="text-sm font-medium leading-snug text-gray-600">
            14 hours ago
          </p> -->
        </div>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
// import { ready } from '@amcharts/amcharts4/core'
// import { radarChart } from '~/assets/js/radarCursor.js'

export default {
  props: {
    activityName: {
      type: String,
      default: 'Test Activity (Example)',
    },
    className: {
      type: String,
      default: 'CS520-1L B43',
    },
    classTopic: {
      type: String,
      default: 'General Knowledge',
    },
    startTime: {
      type: Date,
      default: () => {
        return new Date()
      },
    },
    endTime: {
      type: Date,
      default: () => {
        return new Date()
      },
    },
  },
  data() {
    return {
      locale: 'en-US',
      options: {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      },
      progress: 10,
    }
  },
  //   mounted() {
  //     ready(function () {
  //       radarChart('chartdiv2', [
  //         {
  //           category: 'Research',
  //           value: 80,
  //           full: 100,
  //         },
  //       ])
  //     }) // end am4core.ready()
  //   },
  methods: {
    notImplemented() {
      this.$toast.info('This feature is coming soon!')
    },
  },
}
</script>
