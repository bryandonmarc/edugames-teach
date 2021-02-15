<template>
  <!-- component -->
  <main
    class="flex-1 px-10 pt-2 pb-2 my-1 overflow-y-auto transition duration-500 ease-in-out bg-gray-200 rounded-l-lg dark:bg-black"
  >
    <div class="flex flex-col text-3xl capitalize mb-3">
      <span class="font-semibold"
        >hello,
        <!-- <span class="font-normal">{{ getAuthUser.displayName }}</span> -->
      </span>
    </div>
    <div class="flex flex-col items-start lg:flex-row">
      <div
        class="flex-col flex-shrink-0 w-full py-2 my-4 mr-6 bg-white rounded-lg lg:w-1/2 dark:bg-gray-600"
      >
        <!-- Card list container -->

        <h3
          class="flex items-center px-8 pt-1 pb-1 text-lg font-semibold capitalize dark:text-gray-300"
        >
          <!-- Header -->
          <span>Past Sessions</span>
          <button class="ml-2">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 256 512">
              <path
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
								0l-22.6-22.6c-9.4-9.4-9.4-24.6
								0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
								0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
								136c9.5 9.4 9.5 24.6.1 34z"
              ></path>
            </svg>
          </button>
        </h3>

        <div>
          <!-- List -->

          <ActivityCard />

          <!-- <a
              href="/"
              class="flex justify-center text-blue-500 capitalize dark:text-blue-200"
            >
              <span>see all</span>
            </a> -->
        </div>
      </div>
      <div
        class="flex flex-col flex-shrink-0 w-full py-2 my-4 mr-6 text-white bg-purple-300 rounded-lg lg:w-1/2"
      >
        <EmptySessions />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  layout(context) {
    return 'homeTeacherLayout'
  },
  computed: {
    ...mapGetters('login', ['getAuthUser']),
  },
  methods: {
    ...mapActions('login', ['logOut']),
    notImplemented() {
      this.$toast.info('This feature is coming soon!')
    },
  },
}
</script>
