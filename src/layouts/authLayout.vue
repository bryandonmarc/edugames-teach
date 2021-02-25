<template>
  <div class="bg-gray-900">
    <div id="flow" class="fixed">
      <span class="flow-1 animate-spin" style="animation-duration: 20s"></span>
      <span class="flow-2 animate-spin" style="animation-duration: 15s"></span>
      <span class="flow-3 animate-spin" style="animation-duration: 7s"></span>
    </div>
    <Nuxt class="relative" />
  </div>
</template>

<script>
export default {
  name: 'LayoutAuth',
}
</script>

<style scoped>
#flow span {
  @apply absolute block opacity-60;

  width: 200vw;
  height: 200vw;
  top: -180vw;
  left: -40vw;
  border-radius: 90vw;
}
.flow-1 {
  background: #3281ff;
}
.flow-2 {
  background: #f442ee;
}
.flow-3 {
  background: #42eef4;
}
</style>
