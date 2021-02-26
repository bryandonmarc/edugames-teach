<template>
  <div class="flex-1 w-full h-auto bg-gray-200">
    <div class="container relative p-10 mx-auto mb-8 overflow-hidden wrap">
      <div
        class="absolute h-full border border-purple-700"
        style="left: 50%"
      ></div>
      <div
        v-for="(activity, index) in getActivities"
        :key="index"
        class="flex items-center justify-between w-full mb-8 right-timeline"
        :class="[
          { 'flex-row-reverse': index % 2 == 0 },
          { 'pb-16': index + 1 == getActivities.length },
        ]"
      >
        <div class="order-1 w-5/12"></div>
        <div
          class="z-20 flex items-center order-1 w-8 h-8 bg-purple-700 rounded-full shadow-xl"
        >
          <h1 class="mx-auto text-lg font-semibold text-white">
            {{ index + 1 }}
          </h1>
        </div>
        <ul class="order-1 w-5/12 rounded-lg shadow-xl">
          <ActivityCard
            v-bind="{
              activityName: activity.activityName,
              activityTopic: activity.activityTopic,
              startTime: activity.startTime,
              endTime: activity.endTime,
              className,
            }"
          ></ActivityCard>
        </ul>
      </div>
      <div class="container absolute bottom-0 w-full">
        <div
          class="flex items-center justify-between w-full mt-8 -ml-10 right-timeline"
        >
          <div class="order-1 w-5/12"></div>
          <div
            class="z-20 flex items-center order-1 w-full h-16 bg-purple-700 rounded-full shadow-xl cursor-pointer max-w-prose"
            @click="$emit('createActivity')"
          >
            <h1 class="mx-auto text-lg font-semibold text-white">+ Add more</h1>
          </div>
          <div class="order-1 w-5/12"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    className: {
      type: String,
      default: 'CS520-1L B43',
    },
  },
  computed: {
    ...mapGetters('activity', ['getActivitiesBySessionId']),
    getActivities() {
      return this.getActivitiesBySessionId(this.$route.params.id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
