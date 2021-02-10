<template>
  <!-- component -->
  <div class="flex w-full h-screen overflow-hidden select-none">
    <Navbar />
    <main
      class="flex-1 px-10 pt-2 pb-2 my-1 overflow-y-auto transition duration-500 ease-in-out bg-gray-200 rounded-l-lg dark:bg-black"
    >
      <div class="flex flex-col text-3xl capitalize">
        <span class="font-semibold">hello,</span>
        <span>{{ $fire.auth.currentUser.displayName }}</span>
      </div>
      <div class="flex flex-col md:flex-row">
        <div
          class="flex flex-col flex-shrink-0 w-full py-2 mt-8 mr-6 bg-white rounded-lg md:w-1/2 dark:bg-gray-600"
        >
          <!-- Card list container -->

          <h3
            class="flex items-center px-8 pt-1 pb-1 text-lg font-semibold capitalize dark:text-gray-300"
          >
            <!-- Header -->
            <span>nearby jobs</span>
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

            <ul class="px-3 pt-1 pb-2 overflow-y-auto">
              <li class="mt-2">
                <a
                  class="flex flex-col justify-between p-5 bg-gray-100 rounded-lg dark:bg-gray-200"
                  href="/"
                >
                  <div
                    class="flex items-center justify-between font-semibold capitalize dark:text-gray-700"
                  >
                    <!-- Top section -->

                    <span>english lesson</span>

                    <div class="flex items-center">
                      <svg
                        class="w-5 h-5 mr-1 text-gray-600 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M14 12l-4-4v3H2v2h8v3m12-4a10
												10 0 01-19.54 3h2.13a8 8 0
												100-6H2.46A10 10 0 0122 12z"
                        ></path>
                      </svg>
                      <span>4.2 mi</span>
                    </div>
                  </div>

                  <p
                    class="my-3 text-sm font-medium leading-snug text-gray-600"
                  >
                    <!-- Middle section -->
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Explicabo assumenda porro sapiente, cum nobis tempore
                    delectus consectetur ullam reprehenderit quis ducimus, iusto
                    dolor nam corporis id perspiciatis consequuntur saepe
                    excepturi.
                  </p>

                  <div class="flex justify-between">
                    <!-- Bottom section -->

                    <div class="flex">
                      <img
                        class="w-6 h-6 mr-3 rounded-full"
                        src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                        alt=""
                      />
                      <span>
                        <span class="font-semibold text-blue-500">
                          Regina C.
                        </span>
                        via HeyTutor
                      </span>
                    </div>

                    <p class="text-sm font-medium leading-snug text-gray-600">
                      14 hours ago
                    </p>
                  </div>
                </a>
              </li>
              <li class="mt-2">
                <a
                  class="flex flex-col justify-between p-5 bg-gray-100 rounded-lg dark:bg-gray-200"
                  href="/"
                >
                  <div
                    class="flex items-center justify-between font-semibold capitalize dark:text-gray-700"
                  >
                    <!-- Top section -->

                    <span>english lesson</span>

                    <div class="flex items-center">
                      <svg
                        class="w-5 h-5 mr-1 text-gray-600 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M14 12l-4-4v3H2v2h8v3m12-4a10
												10 0 01-19.54 3h2.13a8 8 0
												100-6H2.46A10 10 0 0122 12z"
                        ></path>
                      </svg>
                      <span>4.2 mi</span>
                    </div>
                  </div>

                  <p
                    class="my-3 text-sm font-medium leading-snug text-gray-600"
                  >
                    <!-- Middle section -->
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Explicabo assumenda porro sapiente, cum nobis tempore
                    delectus consectetur ullam reprehenderit quis ducimus, iusto
                    dolor nam corporis id perspiciatis consequuntur saepe
                    excepturi.
                  </p>

                  <div class="flex justify-between">
                    <!-- Bottom section -->

                    <div class="flex">
                      <img
                        class="w-6 h-6 mr-3 rounded-full"
                        src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                        alt="Issue"
                      />
                      <span>
                        <span class="font-semibold text-blue-500">
                          Regina C.
                        </span>
                        via HeyTutor
                      </span>
                    </div>

                    <p class="text-sm font-medium leading-snug text-gray-600">
                      14 hours ago
                    </p>
                  </div>
                </a>
              </li>
            </ul>

            <a
              href="/"
              class="flex justify-center text-blue-500 capitalize dark:text-blue-200"
            >
              <span>see all</span>
            </a>
          </div>
        </div>
        <EmptySessions />
      </div>
    </main>

    <aside class="fixed right-0 mt-4 mr-4">
      <div class="flex items-center">
        <!-- Right side -->

        <button
          class="flex items-center ml-1 focus:outline-none"
          @click="profileMenuActive = !profileMenuActive"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="object-cover w-10 h-10 text-purple-500 rounded-full"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            />
          </svg>
          <svg class="w-4 h-4 fill-current" viewBox="0 0 192 512">
            <path
              d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72
							72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72
							72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0
							352c0 39.8 32.2 72 72 72s72-32.2
							72-72-32.2-72-72-72-72 32.2-72 72z"
            ></path>
          </svg>
        </button>
        <transition
          enter-active-class="transition ease-out duration-100"
          leave-active-class="transition ease-in duration-75"
          enter-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="profileMenuActive"
            class="absolute top-0 right-0 w-full mt-12 origin-top-right rounded-md shadow-lg md:w-48"
          >
            <div class="px-2 py-2 bg-white rounded-md shadow">
              <nuxt-link
                class="flex flex-row items-center block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                to="/"
                @click.native="logOut()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-5 h-5 mr-2 text-purple-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout</nuxt-link
              >
            </div>
          </div>
        </transition>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      profileMenuActive: false,
    }
  },
  computed: {
    ...mapGetters('login', ['getAuthUser']),
  },
  methods: {
    ...mapActions('login', ['logOut']),
  },
}
</script>
