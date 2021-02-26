<template>
  <div :class="{ dark: isDark }">
    <div
      class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light"
    >
      <!-- Sidebar -->
      <!-- Backdrop -->
      <client-only>
        <div
          v-if="isSidebarOpen"
          class="fixed inset-0 z-10 bg-indigo-800 lg:hidden"
          style="opacity: 0.5"
          aria-hidden="true"
          @click="toggleSidebarMenu()"
        ></div>

        <transition
          enter-active-class="transition duration-150 ease-out transform-gpu"
          leave-active-class="transition duration-150 ease-in transform-gpu"
          enter-class="-translate-x-full opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-class="translate-x-0 opacity-100"
          leave-to-class="-translate-x-full opacity-0"
        >
          <aside
            v-if="showSidebar()"
            ref="sidebar"
            tabindex="-1"
            class="fixed inset-y-0 z-10 flex flex-shrink-0 overflow-hidden bg-white border-r lg:static dark:border-indigo-800 dark:bg-darker focus:outline-none"
            @click="isSidebarOpen && toggleSidebarMenu()"
            @keyup.esc="isSidebarOpen && toggleSidebarMenu()"
          >
            <Navbar />
          </aside>
        </transition>
      </client-only>
      <!-- Navbar -->

      <!-- Profile -->

      <!-- Menu Button -->
      <nav
        class="fixed space-x-4 transition-all duration-150 ease-in-out top-5 right-10"
      >
        <div class="flex items-center">
          <Profile />
          <button
            class="p-1 text-indigo-400 transition-colors duration-200 rounded-md lg:hidden bg-indigo-50 hover:text-indigo-600 hover:bg-indigo-100 dark:hover:text-light dark:hover:bg-indigo-700 dark:bg-dark focus:outline-none focus:ring"
            @click="
              toggleSidebarMenu(),
                $nextTick(() => {
                  $refs.sidebar.focus()
                })
            "
          >
            <span class="sr-only">Toggle Menu</span>
            <span aria-hidden="true">
              <svg
                v-if="!isSidebarOpen"
                class="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                class="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
      </nav>

      <!-- Main content -->
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TeacherLayout',
  middleware({ app, redirect }) {
    if (!app.$fire.auth.currentUser) {
      return redirect('/')
    }
  },
  data() {
    return {
      loading: true,
      isDark: this.getTheme,
      isSidebarOpen: process.browser && window.innerWidth >= 1024,
      view: {
        atTopOfPage: true,
      },
    }
  },
  computed: {
    ...mapGetters('session', ['getSessionIds']),
  },
  async mounted() {
    this.$nextTick(function () {
      this.showSidebar()
    })
    window.addEventListener('resize', this.showSidebar)
    await this.fetchSessions()
    // if (this.getSessionIds.length) await this.fetchActivities()
  },
  methods: {
    ...mapActions('session', ['fetchSessions']),
    ...mapActions('activity', ['fetchActivities']),
    showSidebar() {
      if (this.isSidebarOpen === false)
        this.isSidebarOpen = process.browser && window.innerWidth >= 1024

      return this.isSidebarOpen
    },
    getTheme() {
      if (process.browser && window.localStorage.getItem('dark')) {
        return JSON.parse(window.localStorage.getItem('dark'))
      }
      return (
        process.browser &&
        !!window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    },
    setTheme(value) {
      window.localStorage.setItem('dark', value)
    },
    toggleTheme() {
      this.isDark = !this.isDark
      this.setTheme(this.isDark)
    },
    setLightTheme() {
      this.isDark = false
      this.setTheme(this.isDark)
    },
    setDarkTheme() {
      this.isDark = true
      this.setTheme(this.isDark)
    },
    toggleSidebarMenu() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
  },
}
</script>
