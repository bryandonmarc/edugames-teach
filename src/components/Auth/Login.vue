<template>
  <AuthForm
    :form-name="'login'"
    :inputs="inputs"
    :submit-handler="submitHandler"
  >
    <template #header>
      <h2 class="font-black">Log In</h2>
      <span>Connect to your account</span>
    </template>

    <template #submit="{ hasErrors }">
      <button
        type="submit"
        class="inline-flex items-center justify-center m-1 sign-up hover-darken focus:outline-none formulate-formbutton"
        :disabled="hasErrors"
      >
        <Spinner v-if="loading" />
        <span v-else>Login&nbsp;</span>
      </button>
    </template>

    <div class="p-1 lg:hidden">
      <span>
        <nuxt-link
          to="/signup"
          class="text-sm italic text-gray-700 underline no-select"
        >
          Don't have an account?
        </nuxt-link>
      </span>
    </div>
  </AuthForm>
</template>

<script>
import { mapActions } from 'vuex'
import Spinner from '~/assets/svg/spinner.svg?inline'

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      inputs: [
        { name: 'email', rules: 'required|email', placeholder: 'Email' },
        {
          name: 'password',
          rules: 'required',
          placeholder: 'Password',
          type: 'password',
        },
      ],
      loading: false,
    }
  },
  methods: {
    ...mapActions('login', ['getUser']),
    async submitHandler(data) {
      const getUserTrace = this.$fire.performance.trace('getUser')
      getUserTrace.start()
      this.loading = true
      try {
        await this.getUser(data)
        getUserTrace.stop()
        this.$toast.success('Successfully logged in!')
        this.$router.push({ name: 'home' })
        this.$nextTick(() => {
          this.$formulate.reset('login')
        })
      } catch (error) {
        switch (error) {
          case 'auth/user-disabled':
            this.$toast.error(
              'Your account is currently disabled! Please contact the administrator for details.'
            )
            break
          case 'auth/user-not-found':
            this.$toast.error('User does not exist! Please check your email.')
            break
          case 'auth/wrong-password':
            this.$toast.error('Incorrect login credentials. Please try again!')
            break
        }
      }
      this.loading = false
    },
  },
}
</script>
