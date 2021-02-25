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

      <li class="p-2 mt-3 rounded-lg dark:text-blue-300">
        <nuxt-link to="/home" class="flex flex-col items-center">
          <svg
            class="w-5 h-5 stroke-current"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
          <span class="mt-2 text-xs">Dashboard</span>
        </nuxt-link>
      </li>

      <li
        class="p-2 mt-3 rounded-lg hover:text-blue-600 dark-hover:text-blue-300"
      >
        <nuxt-link to="/session" class="flex flex-col items-center">
          <svg
            class="w-5 h-5 stroke-current"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <span class="mt-2 text-xs">Classes</span>
        </nuxt-link>
      </li>

      <li
        class="p-2 mt-3 rounded-lg hover:text-blue-600 dark-hover:text-blue-300"
      >
        <nuxt-link to="/activity" class="flex flex-col items-center">
          <svg
            class="w-5 h-5 stroke-current"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span class="mt-2 text-xs">Activities</span>
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
  },
}
</script>

<style scoped>
.nuxt-link-active {
  @apply text-blue-600;
}
</style>
