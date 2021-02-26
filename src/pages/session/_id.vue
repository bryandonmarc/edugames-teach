<template>
  <div class="flex flex-col w-full h-full bg-white">
    <div class="w-full px-16 pt-8 border-b">
      <div class="flex flex-row m-8">
        <img
          :src="session.imgUrl"
          class="w-20 h-20 bg-purple-500 object-fit rounded-2xl"
        />
        <div class="flex flex-col justify-around ml-4">
          <div>
            <h1 class="font-bold">{{ session.className }}</h1>
          </div>
          <div class="flex flex-row space-x-4 text-sm text-gray-500">
            <span class="inline-flex">{{ session.topic }}</span>
            <span
              class="inline-flex items-center font-semibold text-purple-600 underline cursor-pointer"
              @click="copyToClipboard"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 mr-2 fill-current"
                viewBox="0 0 469 469"
              >
                <path
                  d="M249 192a128 128 0 100 85h92v86h86v-86h42v-85H249zm-121 85a43 43 0 110-85 43 43 0 010 85z"
                /></svg
              >{{ session.id }}</span
            >
          </div>
        </div>
      </div>
      <nav class="md:ml-14">
        <ul class="flex flex-row">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            class="block px-6 py-4 text-lg font-bold tracking-wide transition ease-in-out border-b-2 cursor-pointer hover:text-purple-500 focus:outline-none"
            :class="[
              currentTab === tab
                ? 'text-purple-500 border-purple-500'
                : 'text-gray-500',
            ]"
            @click="currentTab = tab"
          >
            {{ tab }}
          </li>
        </ul>
      </nav>
    </div>
    <component
      :is="currentTab"
      :class-name="session.className"
      @success="currentTab = 'Timeline'"
      @createActivity="currentTab = 'Activities'"
    ></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Activities from '~/components/Session/Activities'
import Timeline from '~/components/Session/Timeline'

export default {
  components: {
    Activities,
    Timeline,
  },
  layout(context) {
    return 'homeTeacherLayout'
  },
  data() {
    return {
      currentTab: 'Timeline',
      tabs: ['Timeline', 'Activities'],
    }
  },
  computed: {
    ...mapGetters('session', ['getSessionById']),
    session() {
      return this.getSessionById(this.$route.params.id)
    },
  },
  methods: {
    copyToClipboard() {
      const el = document.createElement('textarea')
      el.value = this.session.sessionCode
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
        `Classroom code&nbsp;<u>${this.session.id}</u>&nbsp;copied to clipboard!`
      )
    },
  },
}
</script>

<style lang="scss" scoped></style>
