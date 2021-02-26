<template>
  <li class="mt-2 overflow-y-auto">
    <div
      class="flex flex-col justify-between p-5 bg-gray-100 border-l-8 border-purple-700 rounded-lg dark:bg-gray-200"
      @click="$emit('click')"
    >
      <div
        class="flex flex-col items-start justify-between mb-4 capitalize sm:flex-row sm:items-center dark:text-gray-700"
      >
        <span class="text-xl font-bold">{{ activityName }}</span>

        <div class="flex flex-col text-gray-500 md:flex-row">
          <div class="inline-flex items-center">
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
          </div>
          <div class="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 mr-1 fill-current md:ml-3"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{{ activityTopic }}</span>
          </div>
        </div>
      </div>

      <slot>
        <div class="flex overflow-x-auto flex-nowrap hide-scroll-bar">
          <div class="inline-block px-3 mb-2">
            <div
              class="p-4 transition-shadow duration-300 ease-in-out rounded-lg shadow-md bg-gray-50"
            >
              <TimeProgressCircle
                v-bind="{ radius: 80, stroke: 10, startTime, endTime }"
                :custom-class="'text-purple-500 text-lg font-bold'"
                >Time Remaining
              </TimeProgressCircle>
            </div>
          </div>
          <div class="inline-block px-3 mb-2">
            <div
              class="p-4 transition-shadow duration-300 ease-in-out rounded-lg shadow-md bg-gray-50"
            >
              <PercentProgressCircle
                v-bind="{ radius: 80, stroke: 10, percent: '4/7' }"
                :custom-class="'text-purple-500 text-lg font-bold'"
                >Avg. Solved Score
              </PercentProgressCircle>
            </div>
          </div>
        </div>
      </slot>

      <div class="flex flex-col justify-end text-gray-500 md:flex-row">
        <div class="flex italic">
          {{ startTime.toLocaleDateString(locale, options) }}
          -
          {{ endTime.toLocaleDateString(locale, options) }}
        </div>

        <p class="text-sm font-medium leading-snug text-gray-600">
          <span
            class="inline-flex items-center px-3 pb-1 mr-2 text-sm font-semibold text-purple-600 underline rounded-full cursor-pointer bg-grey-lighter text-grey-darker"
            @click="copyToClipboard"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 mr-2 fill-current"
              viewBox="0 0 469 469"
            >
              <path
                d="M249 192a128 128 0 100 85h92v86h86v-86h42v-85H249zm-121 85a43 43 0 110-85 43 43 0 010 85z"
              /></svg
            >{{ id }}</span
          >
        </p>
      </div>
    </div>
  </li>
</template>

<script>
// import { ready } from '@amcharts/amcharts4/core'
// import { radarChart } from '~/assets/js/radarCursor.js'

export default {
  props: {
    id: {
      type: String,
      default: 'pierre-1433',
    },
    activityName: {
      type: String,
      default: 'Test Activity (Example)',
    },
    className: {
      type: String,
      default: 'CS520-1L B43',
    },
    activityTopic: {
      type: String,
      default: 'General Knowledge',
    },
    startTime: {
      type: Date,
      default: () => {
        const _date = new Date()
        _date.setMinutes(_date.getMinutes() - 5)
        return _date
      },
    },
    endTime: {
      type: Date,
      default: () => {
        const _date = new Date()
        _date.setMinutes(_date.getMinutes() + 1)
        return _date
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
    copyToClipboard() {
      const el = document.createElement('textarea')
      el.value = this.id
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }
      this.$toast.info(
        `Activity code&nbsp;<u>${this.id}</u>&nbsp;copied to clipboard!`
      )
    },
  },
}
</script>
