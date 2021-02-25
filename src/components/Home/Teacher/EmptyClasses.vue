<template>
  <div class="flex flex-col items-center mt-12">
    <EmptySession style="max-height: 523px" class="w-full px-10" />

    <span class="mt-8 font-bold">Your class list is empty</span>

    <span class="text-purple-500"> Make your first class! </span>

    <nuxt-link
      to="/session/create"
      class="px-4 py-2 my-4 bg-purple-800 rounded-lg"
      @click="
        (event) => {
          !checkVerifiedStatus() && event.preventDefault()
        }
      "
    >
      Create Session
    </nuxt-link>
  </div>
</template>

<script>
import EmptySession from '~/assets/svg/empty_session.svg?inline'
export default {
  components: {
    EmptySession,
  },
  methods: {
    checkVerifiedStatus() {
      const status = this.$fire.auth.currentUser.emailVerified

      if (!status) {
        this.$toast.error(
          'To access this feature, please verify your email first!'
        )
      }
      return status
    },
  },
}
</script>
