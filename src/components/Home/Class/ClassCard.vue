<template>
  <li class="flex w-full h-full p-4 mt-2 overflow-y-hidden text-black">
    <div
      class="flex flex-col justify-between w-full bg-gray-100 border-b-8 border-purple-700 rounded-lg dark:bg-gray-200"
      @click="$emit('click', seedData)"
    >
      <div
        style="padding-top: 40%"
        class="relative w-full h-0 bg-purple-700 rounded-t-lg"
        :class="{ 'animate-pulse': !isLoaded }"
      >
        <img
          ref="image"
          :src="session.imgUrl ? session.imgUrl : imgUrl"
          alt="Class banner thumbnail photo"
          class="absolute top-0 left-0 object-cover object-bottom w-full rounded-t-lg"
          @load="onImgLoad"
          @error="setAltImg"
        />
      </div>
      <!-- <img
        class="object-cover object-bottom w-full h-40 rounded-t-lg"
        :src="session.imgUrl || `https://picsum.photos/400/160`"
        alt="Class banner thumbnail photo"
      /> -->
      <div class="px-6 py-4">
        <div class="mb-2 text-2xl font-bold uppercase">
          {{ session.className ? session.className : 'CS134-1P B56' }}
        </div>
        <p class="text-base text-grey-darker">
          {{
            session.topic ? session.topic : 'SOFTWARE ENGINEERING 1-Section B56'
          }}
        </p>
      </div>
      <div class="flex justify-end pb-2">
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
          >{{ session.id }}</span
        >
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    session: {
      type: Object,
      default: () => {
        return {
          className: 'CS520-1L B43',
          date: new Date(),
          sessionCode: 'pierre-1143',
          topic: 'SOFTWARE ENGINEERING TEST TEST 1-Section B43',
          imgUrl: `https://picsum.photos/400/160`,
        }
      },
    },
    seed: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      isLoaded: false,
      seedData: this.seed,
    }
  },
  computed: {
    seedProp() {
      return this.seed
    },
  },
  watch: {
    imgUrl() {
      this.isLoaded = false
      this.seedData = this.seedProp
      console.log('watched img url change')
    },
  },
  methods: {
    onImgLoad() {
      this.isLoaded = true
      this.seedData = this.seedProp
    },
    setAltImg(event) {
      this.seedData < 1084 ? (this.seedData += 1) : (this.seedData = 0)
      event.target.src = `https://picsum.photos/id/${this.seedData}/400/160`
      this.$emit('click', this.seedData)
    },
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
