<template>
  <div
    class="absolute top-0 flex flex-col items-center justify-center w-1/2 h-full px-4 py-10 text-center transition duration-500 ease-in-out"
  >
    <h1 class="font-semibold leading-none">{{ titleMessage }}</h1>
    <p class="my-4">
      {{ headerMessage }}
    </p>
    <button
      id="signIn"
      class="inline-flex border border-white ghost focus:outline-none"
      form="rightform"
      type="reset"
      @click="$emit('update:active', emitBoolean)"
    >
      {{ buttonMessage }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    titleMessage: {
      type: String,
      default: '',
    },
    headerMessage: {
      type: String,
      default: '',
    },
    buttonMessage: {
      type: String,
      default: '',
    },
    emitBoolean: {
      type: Boolean,
    },
  },
}
</script>

<style lang="postcss" scoped>
.ghost::v-deep {
  @apply px-12 py-3 text-xs font-bold tracking-widest uppercase rounded-full text-white bg-transparent;
}
</style>
