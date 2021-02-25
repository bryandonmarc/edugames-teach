<template>
  <AuthForm
    :form-name="'signup'"
    :inputs="inputs"
    :submit-handler="submitHandler"
  >
    <template #header>
      <h2 class="font-black">Sign Up</h2>
      <span>Create your own account</span>
    </template>

    <template #submit="{ hasErrors }">
      <button
        type="submit"
        class="inline-flex items-center justify-center m-1 sign-up hover-darken focus:outline-none formulate-formbutton"
        :disabled="hasErrors"
      >
        <Spinner v-if="loading" />
        <span v-else>Sign Up&nbsp;</span>
      </button>
    </template>

    <div class="p-1 lg:hidden">
      <span>
        <nuxt-link
          to="/login"
          class="text-sm italic text-gray-700 underline no-select"
        >
          Already have an account?
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
        {
          name: 'username',
          rules: 'required',
          placeholder: 'Full Name',
        },
        { name: 'email', rules: 'required|email', placeholder: 'Email' },
        {
          name: 'password',
          rules: 'required|min:8|strong',
          placeholder: 'Password',
          type: 'password',
          validationRule: {
            strong: ({ value }) =>
              value.match(
                `((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$`
              ),
          },
          validationMessage: {
            strong:
              'Password must contain at least 1 upper case letter, 1 lower case letter, and 1 number or special character.',
          },
        },
      ],
      loading: false,
    }
  },
  methods: {
    ...mapActions('signup', ['registerTeacher']),
    async submitHandler(data) {
      const createUserTrace = this.$fire.performance.trace('createUser')
      createUserTrace.start()
      this.loading = true
      try {
        await this.registerTeacher(data)
        createUserTrace.stop()
        this.$toast.success(
          'You have registered successfully! Please check your email to verify your account.'
        )
        this.$formulate.reset('signup')
        // this.$nextTick(() => {
        //   this.$router.push({ name: 'home' })
        // })
        this.$router.push({ name: 'home' })
      } catch (error) {
        switch (error) {
          case 'auth/email-already-in-use':
            this.$toast.error(
              'Email is already registered! Please check your email.'
            )
            break
          default:
            this.$toast.error('An error occured. ' + error)
            break
        }
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.formulate-formbutton::v-deep {
  @apply px-12 py-3 text-xs font-bold tracking-widest uppercase rounded-full bg-purple-500 text-white;

  &:disabled {
    @apply font-bold text-white bg-gray-400 opacity-50 pointer-events-none select-none;
  }
}
</style>
