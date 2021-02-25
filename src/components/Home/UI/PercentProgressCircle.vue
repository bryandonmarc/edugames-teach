<template>
  <ProgressCircle
    :radius="radius"
    :stroke="stroke"
    :custom-class="customClass"
    :progress="progress"
  >
    <template #inside>
      {{ percent }}
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
    percent: {
      type: String,
      default: '3/5',
    },
  },
  computed: {
    progress() {
      return ((split) => Math.floor((split[0] / split[1]) * 100).toString())(
        this.percent.split('/')
      )
    },
  },
}
</script>
