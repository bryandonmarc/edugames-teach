<template>
  <div class="flex flex-col items-center mt-12">
    <EmptyClass style="max-height: 523px" class="w-full px-10" />

    <span class="mt-8 font-bold">Your activity list is empty</span>

    <span class="text-blue-500"> Make your first activity! </span>

    <button
      class="px-4 py-2 my-4 text-white bg-blue-500 rounded-lg"
      @click="checkVerifiedStatus()"
    >
      Create Activity
    </button>
  </div>
</template>

<script>
import EmptyClass from '~/assets/svg/empty_class.svg?inline'
export default {
  components: {
    EmptyClass,
  },
  methods: {
    checkVerifiedStatus() {
      if (this.$fire.auth.currentUser.emailVerified) {
        this.$toast.info('This feature is coming soon!')
      } else {
        this.$toast.error(
          'To access this feature, please verify your email first!'
        )
      }
    },
  },
}
</script>
