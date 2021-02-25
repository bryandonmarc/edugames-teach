<template>
  <div>
    <svg :height="radius * 2" :width="radius * 2">
      <circle
        class="text-gray-300 transition-all duration-300 -rotate-90 stroke-current transform-gpu"
        style="transform-origin: 50% 50%"
        fill="transparent"
        :stroke-width="stroke"
        :r="normalizedRadius"
        :cx="radius"
        :cy="radius"
      />
      <circle
        class="transition-all duration-300 -rotate-90 stroke-current transform-gpu"
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
        <slot name="inside"></slot>
      </text>
    </svg>
    <h4 class="w-full text-base font-medium text-center text-gray-600">
      <slot></slot>
    </h4>
  </div>
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
