<template>
  <!-- component -->
  <main
    class="flex-1 px-10 pt-2 pb-2 my-1 overflow-y-auto transition duration-500 ease-in-out bg-gray-200 rounded-l-lg dark:bg-black"
  >
    <div class="flex flex-col mt-3 text-3xl capitalize">
      <span class="font-semibold"
        >hello,
        <span class="font-normal">{{ getAuthUser.displayName }}</span>
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
          <span>Ongoing Activities</span>
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
          <ul v-if="true">
            <ActivityCard @click="notImplemented()" />
          </ul>
          <EmptyActivities v-else />

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
        <h3
          class="flex items-center px-8 pt-1 pb-1 text-lg font-bold capitalize"
        >
          <span>Active Classes</span>
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
        <ul v-if="getSessions.length" class="grid grid-cols-2 gap4">
          <nuxt-link
            v-for="(session, index) in getSessions.slice(0, 4)"
            :key="index"
            :to="'/session/' + session.id"
          >
            <ClassCard :key="index" :random="index" :session="session" />
          </nuxt-link>
          <li
            v-if="getSessions.length < 4"
            class="flex p-4 mt-2 overflow-y-auto"
            style="min-height: 16.5rem"
          >
            <nuxt-link
              class="flex items-center justify-center flex-grow w-full h-auto bg-white bg-opacity-25 border-4 border-white border-opacity-50 border-dashed rounded-lg"
              to="/session/create"
            >
              <h3 class="font-semibold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="w-24 h-24 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </h3>
            </nuxt-link>
          </li>
        </ul>
        <nuxt-link
          v-if="getSessions.length > 4"
          to="/session"
          class="flex justify-center mt-4 mb-2 font-semibold text-white capitalize dark:text-blue-200 hover:underline"
        >
          <span>see all</span>
        </nuxt-link>
        <EmptyClasses v-if="!getSessions.length" />
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
    ...mapGetters('session', ['getSessions']),
  },
  methods: {
    ...mapActions('login', ['logOut']),
    notImplemented() {
      this.$toast.info('This feature is coming soon!')
    },
  },
}
</script>
