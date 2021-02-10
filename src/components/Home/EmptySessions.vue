<template>
  <div
    class="flex flex-col flex-shrink-0 w-full py-2 mt-8 mr-6 text-white bg-purple-300 rounded-lg md:w-1/2"
  >
    <h3 class="flex items-center px-8 pt-1 pb-1 text-lg font-bold capitalize">
      <span>Scheduled lessons</span>
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

    <div class="flex flex-col items-center mt-12">
      <EmptySession class="w-4/5" />

      <span class="mt-8 font-bold">Your schedule is empty</span>

      <span class="text-purple-500"> Make your first appointment </span>

      <button class="px-4 py-2 mt-8 bg-purple-800 rounded-lg">
        Find a Job
      </button>
    </div>
  </div>
</template>

<script>
import EmptySession from '~/assets/svg/empty_session.svg?inline'
export default {
  components: {
    EmptySession,
  },
}
</script>
