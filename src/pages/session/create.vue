<template>
  <main
    class="flex-1 px-10 pt-2 pb-2 my-1 overflow-y-auto transition duration-500 ease-in-out bg-gray-200 rounded-l-lg dark:bg-black"
  >
    <div class="flex flex-col mt-3 text-3xl capitalize">
      <span class="font-semibold">Create Class</span>
    </div>
    <div class="py-10 mx-auto sm:px-6 lg:px-8" style="max-width: 80rem">
      <FormulateForm
        v-slot="{ hasErrors }"
        v-model="session"
        @submit="submitHandler"
      >
        <div
          class="p-6 bg-white rounded-md shadow md:grid md:grid-cols-3 md:gap-6"
        >
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium text-gray-900">Class Details</h3>
              <p class="mt-1 text-sm text-gray-600">
                Create your gamified virtual classroom!
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="px-4 py-5">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-4">
                  <label
                    class="block text-sm font-medium text-gray-700"
                    for="className"
                  >
                    <span>Class Name</span>
                  </label>
                  <FormulateInput
                    name="className"
                    validation-name="Class Name"
                    placeholder="CS134-1P B56"
                    type="text"
                    validation="required"
                  />
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label
                    class="block text-sm font-medium text-gray-700"
                    for="topic"
                  >
                    <span>Topic</span>
                  </label>
                  <FormulateInput
                    name="topic"
                    placeholder="SOFTWARE ENGINEERING 1-Section B56"
                    type="text"
                    validation="required"
                  />
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label
                    class="block text-sm font-medium text-gray-700"
                    for="topic"
                  >
                    <span>Classroom Code</span>
                  </label>
                  <div class="flex">
                    <FormulateInput
                      name="id"
                      type="text"
                      validation="required"
                      input-class="session-code"
                      readonly
                    />
                    <button
                      type="button"
                      class="p-3 px-8 font-bold text-white uppercase bg-purple-500 rounded-r-lg focus:outline-none active:outline-none"
                      @click="generateCode"
                    >
                      <Refresh
                        class="w-6 h-6 duration-1000 transform-gpu"
                        :class="[
                          toggleGenerateCode ? 'rotate-180' : '-rotate-180',
                        ]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="py-8"><div class="border-t border-gray-200"></div></div>
        </div>
        <div
          class="p-6 bg-white rounded-md shadow md:grid md:grid-cols-3 md:gap-6"
        >
          <div class="grid grid-rows-2 md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium text-gray-900">
                Make it your own!
              </h3>
              <p class="mt-1 text-sm text-gray-600">
                Select how you want your classroom to be presented visually.
              </p>
            </div>
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium text-gray-900">
                Generate more images
              </h3>
              <button
                type="button"
                class="formulate-button"
                @click="shuffleArray"
              >
                <Refresh
                  class="w-6 h-6 duration-1000 transform-gpu"
                  :class="[toggleGenerateImg ? 'rotate-180' : '-rotate-180']"
                />
              </button>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="px-4 py-5">
              <ul class="grid grid-cols-6 gap-6">
                <ClassCard
                  v-for="(number, index) in arrayNumbers.slice(0, 4)"
                  :key="index"
                  class="col-span-6 rounded-lg cursor-pointer md:col-span-3"
                  :class="{
                    'ring-2 ring-purple-400 border-2 border-purple-600 p-4 transition bg-purple-100 delay-150 duration-300 ease-in-out transform-gpu scale-110':
                      index == selectedThumbnail,
                  }"
                  :seed="number"
                  :session="session"
                  :img-url="`https://picsum.photos/id/${number}/400/160`"
                  @click="
                    (seed) => {
                      selectedThumbnail = index
                      imgUrl = `https://picsum.photos/id/${seed}/400/160`
                    }, 
                  "
                />
                <!-- <ClassCard
                  v-for="(number, index) in arrayNumbers.slice(0, 4)"
                  :key="index"
                  class="col-span-6 rounded-lg cursor-pointer md:col-span-3"
                  :class="{
                    'ring-2 ring-purple-400 border-2 border-purple-600 p-4 transition bg-purple-100 delay-150 duration-300 ease-in-out transform-gpu scale-110':
                      index == selectedThumbnail,
                  }"
                  :session="session"
                  :seed="number"
                  @click="
                    (seed) => {
                      selectedThumbnail = index
                      session.imgUrl = `https://picsum.photos/id/${seed}/400/160`
                    }, 
                  "
                /> -->
              </ul>
            </div>
          </div>
        </div>
        <div class="hidden sm:block">
          <div class="py-8"><div class="border-t border-gray-200"></div></div>
        </div>
        <div
          class="flex items-center justify-end px-4 py-3 text-right sm:px-6 sm:rounded-bl-md sm:rounded-br-md"
        >
          <button class="formulate-button" type="submit" :disabled="hasErrors">
            <Spinner v-if="loading" />
            <span v-else>Create</span>
          </button>
        </div>
      </FormulateForm>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import shuffle from 'lodash/shuffle'
import { haikunator } from '~/assets/js/shortHaikunator'
import Spinner from '~/assets/svg/spinner.svg?inline'
import Refresh from '~/assets/svg/refresh.svg?inline'

export default {
  components: {
    Spinner,
    Refresh,
  },
  layout(context) {
    return 'homeTeacherLayout'
  },
  data() {
    return {
      loading: false,
      toggleGenerateImg: false,
      toggleGenerateCode: false,
      arrayNumbers: [...Array(1085).keys()],
      session: {
        className: '',
        topic: '',
        id: '',
      },
      selectedThumbnail: 0,
      imgUrl: '',
    }
  },
  computed: {
    // sessionRandomPic() {
    //   return (seed) => {
    //     return {
    //       ...this.session,
    //       ...{ imgUrl: `https://picsum.photos/id/${seed}/400/160` },
    //     }
    //   }
    // },
  },
  beforeMount() {
    this.shuffleArray()
    this.imgUrl = `https://picsum.photos/id/${
      this.arrayNumbers[this.selectedThumbnail]
    }/400/160`
    this.generateCode()
  },
  methods: {
    ...mapActions('session', ['createSession', 'fetchSessions']),
    async submitHandler(data) {
      try {
        this.loading = true
        await this.createSession({ ...data, ...{ imgUrl: this.imgUrl } })
        this.$toast.success(
          'Your virtual classroom has been successfully created!'
        )
        // this.$nextTick(() => {
        //   this.$router.push({ name: 'session' })
        // })
        this.$router.push({ name: 'session' })
      } catch (error) {
        this.$toast.error('An error occured. ' + error)
      }
      this.loading = false
    },
    shuffleArray() {
      // for (let i = this.arrayNumbers.length - 1; i > 0; --i) {
      //   const j = Math.floor(Math.random() * (i + 1))
      //   ;[this.arrayNumbers[i], this.arrayNumbers[j]] = [
      //     this.arrayNumbers[j],
      //     this.arrayNumbers[i],
      //   ]
      // }
      this.arrayNumbers = shuffle(this.arrayNumbers)
      this.imgUrl = `https://picsum.photos/id/${
        this.arrayNumbers[this.selectedThumbnail]
      }/400/160`
      this.toggleGenerateImg = !this.toggleGenerateImg
      // console.log('shuffled')
    },
    generateCode() {
      let sessionCode = haikunator.haikunate()
      while (
        sessionCode.includes('69') ||
        sessionCode.includes('420') ||
        sessionCode.includes('1337') ||
        sessionCode.includes('616') ||
        sessionCode.includes('666')
      ) {
        let adjective = ''
        let noun = ''
        let number
        ;[adjective, noun, number] = sessionCode.split('-')
        number = (Math.floor(Math.random() * 10000) + 10000)
          .toString()
          .substring(1)
        sessionCode = [adjective, noun, number].join('-')
      }

      this.session.id = sessionCode
      this.toggleGenerateCode = !this.toggleGenerateCode
    },
  },
}
</script>

<style lang="scss" scoped>
.formulate-input::v-deep {
  .formulate-input-wrapper {
    .formulate-input-element {
      input[type='text'] {
        @apply w-full py-2 px-1 mt-2 rounded-md bg-gray-50;

        &:focus,
        &:active {
          @apply mb-1 border-2 border-purple-400 outline-none ring-4 ring-purple-300 ring-opacity-50;
        }

        &.has-error {
          @apply mb-1 border-2 border-red-400 ring-4 ring-red-300 ring-opacity-50;
        }

        &.is-valid {
          @apply mb-1 border-2 border-green-400 ring-4 ring-green-300 ring-opacity-50;
        }
      }

      .session-code {
        margin: 0 !important;
        border-right-width: 0 !important;
        padding: 0.75rem !important;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;

        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
          var(--tw-ring-offset-width) var(--tw-ring-offset-color) !important;
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
          calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color) !important;

        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
          var(--tw-shadow, 0 0 #0000) !important;
      }
    }
  }

  .formulate-input-errors {
    .formulate-input-error {
      @apply text-xs text-red-500;
    }
  }
}

button.formulate-button {
  @apply px-12 py-3 text-xs font-bold tracking-widest uppercase rounded-full bg-purple-500 text-white outline-none;

  &:disabled {
    @apply font-bold bg-gray-400 opacity-50 pointer-events-none select-none;
  }
}
</style>
