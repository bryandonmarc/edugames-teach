<template>
  <svg :height="radius * 2" :width="radius * 2">
    <circle
      class="transform-gpu -rotate-90 transition-all duration-300 stroke-current text-gray-300"
      style="transform-origin: 50% 50%"
      fill="transparent"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
    <circle
      class="transform-gpu -rotate-90 transition-all duration-300 stroke-current"
      style="transform-origin: 50% 50%"
      :class="customClass"
      fill="transparent"
      :style="{
        'stroke-dasharray': circumference + ' ' + circumference,
        'stroke-dashoffset': strokeDashoffset,
        'stroke-linecap': 'round',
      }"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
    <text
      :x="radius"
      :y="radius"
      text-anchor="middle"
      alignment-baseline="middle"
      class="fill-current"
      :class="customClass"
    >
      <slot></slot>
    </text>
  </svg>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 100,
    },
    stroke: {
      type: Number,
      default: 10,
    },
    progress: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      default: 'text-blue-500',
    },
  },
  computed: {
    normalizedRadius() {
      return this.radius - this.stroke * 2
    },
    circumference() {
      return this.normalizedRadius * 2 * Math.PI
    },
    strokeDashoffset() {
      return this.circumference - (this.progress / 100) * this.circumference
    },
  },
}
</script>
