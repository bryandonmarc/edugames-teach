<template>
  <nav class="flex flex-col items-center w-24 py-4 bg-white dark:bg-gray-800">
    <!-- Left side NavBar -->

    <div>
      <!-- App Logo -->

      <svg
        class="w-8 h-8 text-blue-600 fill-current dark:text-blue-300"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82
					6L12 12.72 5.18 9 12 5.28 18.82 9M17 16l-5 2.72L7 16v-3.73L12
					15l5-2.73V16z"
        ></path>
      </svg>
    </div>

    <ul class="mt-2 text-gray-700 capitalize dark:text-gray-400">
      <!-- Links -->

      <li class="p-2 mt-3 text-blue-600 rounded-lg dark:text-blue-300">
        <nuxt-link to="/home" class="flex flex-col items-center">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path
              d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
							17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
							8h-8v10h8V11m-10 4H3v6h8v-6z"
            ></path>
          </svg>
          <span class="mt-2 text-xs">Dashboard</span>
        </nuxt-link>
      </li>

      <li
        class="p-2 mt-3 rounded-lg hover:text-blue-600 dark-hover:text-blue-300"
      >
        <nuxt-link
          to="/sessions"
          class="flex flex-col items-center"
          @click.native="notImplemented(), (event) => event.preventDefault()"
        >
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path
              d="M19 19H5V8h14m0-5h-1V1h-2v2H8V1H6v2H5a2 2 0 00-2
							2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-2.47
							8.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59
							17l5.94-5.94z"
            ></path>
          </svg>
          <span class="mt-2 text-xs">Sessions</span>
        </nuxt-link>
      </li>
    </ul>

    <div
      class="flex items-center p-2 mt-auto text-blue-700 bg-purple-200 rounded-full dark:text-blue-500"
    >
      <!-- important action -->

      <nuxt-link to="/" @click.native="logOut()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="w-5 h-5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('login', ['logOut']),
    notImplemented() {
      this.$toast.info('This feature is coming soon!')
    },
  },
}
</script>
