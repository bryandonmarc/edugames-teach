<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('session', ['getSessionById']),
    session() {
      return this.getSessionById(this.$route.params.id)
    },
  },
}
</script>

<style lang="scss" scoped></style>
