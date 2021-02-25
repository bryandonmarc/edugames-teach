<template>
  <div class="register-page">
    <div class="wrapper">
      <div class="page-header">
        <div class="page-header-image"></div>
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-md-6 offset-lg-0 offset-md-3">
                <div id="square7" class="square square-7"></div>
                <div id="square8" class="square square-8"></div>
                <div class="card card-register">
                  <div class="card-header">
                    <img
                      class="card-img"
                      src="/student/img/square1.png"
                      alt="Card image"
                    />
                    <h4 class="ml-3 text-white card-title">Register</h4>
                  </div>
                  <div class="card-body">
                    <FormulateForm
                      v-slot="{ hasErrors }"
                      class="form"
                      name="student"
                      @submit="submitHandler"
                    >
                      <FormulateInput
                        class="my-4"
                        type="text"
                        placeholder="Full Name"
                        input-class="form-control"
                        name="username"
                        validation-name="Full Name"
                        validation="required"
                      />
                      <FormulateInput
                        class="my-4"
                        type="text"
                        placeholder="Email"
                        input-class="form-control"
                        name="email"
                        validation="required|email"
                      />
                      <FormulateInput
                        class="my-4"
                        type="password"
                        placeholder="Password"
                        input-class="form-control"
                        name="password"
                        validation="required|min:8|strong"
                        :validation-rules="{
                          strong: ({ value }) =>
                            value.match(
                              `((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$`
                            ),
                        }"
                        :validation-messages="{
                          strong:
                            'Password must contain at least 1 upper case letter, 1 lower case letter, and 1 number or special character.',
                        }"
                      />
                      <!-- <div class="text-left form-check">
                        <label class="form-check-label">
                          <input class="form-check-input" type="checkbox" />
                          <span class="form-check-sign"></span>
                          I agree to the
                          <a href="javascript:void(0)">terms and conditions</a>.
                        </label>
                      </div> -->
                      <div class="card-footer">
                        <button
                          :disabled="hasErrors"
                          class="capitalize btn btn-info btn-round btn-lg"
                        >
                          <Spinner v-if="loading" />
                          <span v-else>Sign Up</span>
                        </button>
                      </div>
                    </FormulateForm>
                  </div>
                </div>
              </div>
            </div>
            <div class="register-bg"></div>
            <div id="square1" class="square square-1 transform-gpu"></div>
            <div id="square2" class="square square-2 transform-gpu"></div>
            <div id="square3" class="square square-3 transform-gpu"></div>
            <div id="square4" class="square square-4 transform-gpu"></div>
            <div id="square5" class="square square-5 transform-gpu"></div>
            <div id="square6" class="square square-6 transform-gpu"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      loading: false,
    }
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: '/student/css/blk-design-system.css',
      },
      {
        rel: 'stylesheet',
        href: '/student/css/nucleo-icons.css',
      },
    ],
    script: [
      { src: '/student/js/jquery.min.js', body: true },
      { src: '/student/js/popper.min.js', body: true },
      { src: '/student/js/bootstrap.min.js', body: true },
      { src: '/student/js/blk-design-system.min.js', body: true },
    ],
  },
  methods: {
    ...mapActions('signup', ['registerStudent']),
    async submitHandler(data) {
      const createUserTrace = this.$fire.performance.trace('createUser')
      createUserTrace.start()
      this.loading = true
      try {
        await this.registerStudent(data)
        createUserTrace.stop()
        this.$toast.success(
          'You have registered successfully! Please check your email to verify your account.'
        )
        this.$formulate.reset('student')
        this.$router.push({ name: 'index' })
        this.$nextTick(async () => {
          await this.$fire.auth.signOut()
          this.$store.commit('login/RESET_STORE')
        })
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
.formulate-input::v-deep {
  .formulate-input-errors {
    .formulate-input-error {
      @apply text-xs;

      color: #e14eca;
    }
  }
}
</style>
