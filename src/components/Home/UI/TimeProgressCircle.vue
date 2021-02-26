<template>
  <ProgressCircle
    :radius="radius"
    :stroke="stroke"
    :custom-class="customClass"
    :progress="progress"
  >
    <template #inside>
      {{ timeDifferenceText || "Time's Up!" }}
    </template>
    <slot></slot>
  </ProgressCircle>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 80,
    },
    stroke: {
      type: Number,
      default: 10,
    },
    customClass: {
      type: String,
      default: 'text-blue-500',
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
        _date.setHours(_date.getHours() + 1)
        return _date
      },
    },
  },
  data() {
    return {
      time: new Date(),
      interval: Function,
    }
  },
  computed: {
    currentTime() {
      return this.time
    },
    timeDifference() {
      const start = this.startTime.getTime()
      const end = this.endTime.getTime()
      const current = this.currentTime.getTime()
      const diff = end - current
      const percentage = (current - end) / (end - start)
      const seconds = Math.floor((diff / 1000) % 60)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      return {
        percentage,
        days,
        hours,
        minutes,
        seconds,
      }
    },
    timeDifferenceText() {
      let str = ''

      const diff = (({ days, hours, minutes, seconds }) => [
        days,
        hours,
        minutes,
        seconds,
      ])(this.timeDifference)

      // const appendToString = (_ctr, i) => {
      //   str +=
      //     (_ctr > 0 ? ' ' : '') +
      //     diff[i] +
      //     { 0: 'd', 1: 'h', 2: 'm', 3: 's' }[i]
      // }

      for (let i = 0, n = diff.length, _ctr = 0; _ctr < 2 && i < n; ++i) {
        if (diff[i]) {
          str +=
            (_ctr > 0 ? ' ' : '') +
            diff[i] +
            { 0: 'd', 1: 'h', 2: 'm', 3: 's' }[i]
          _ctr += 1
        }
      }

      return str
    },
    progress() {
      return Math.round(this.timeDifference.percentage * 100).toString()
    },
  },
  mounted() {
    this.interval = setInterval(this.incrementTime, 1000)
  },
  methods: {
    incrementTime() {
      const _date = new Date(this.time.getTime() + 1000)
      if (_date < this.endTime.getTime()) this.time = _date
    },
  },
}
</script>
