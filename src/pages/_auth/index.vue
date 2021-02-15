<template>
  <div>
    <div
      class="flex flex-col items-center justify-center min-h-screen px-2 mx-auto"
    >
      <div
        class="relative w-full max-w-screen-md overflow-hidden bg-white shadow-lg rounded-xl wrapper-container"
        style="min-height: 480px"
        :class="{ 'right-panel-active': rightpanelactive }"
      >
        <div
          v-for="(item, index) in auth"
          :key="index"
          class="absolute top-0 h-full transition-all duration-500 ease-in-out lg:block"
          :class="[{ hidden: $route.params.auth != item.name }, item.class]"
        >
          <div
            class="absolute mt-4 ml-2"
            :class="{ 'md:invisible': item.name === 'signup' }"
          >
            <span>
              <nuxt-link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-12 h-12 text-black fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.452 4.516c.446.436.481 1.043 0 1.576L8.705 10l3.747 3.908c.481.533.446 1.141 0 1.574-.445.436-1.197.408-1.615 0-.418-.406-4.502-4.695-4.502-4.695a1.095 1.095 0 0 1 0-1.576s4.084-4.287 4.502-4.695c.418-.409 1.17-.436 1.615 0z"
                  />
                </svg>
              </nuxt-link>
            </span>
          </div>
          <component :is="item.component" :key="index"></component>
        </div>
        <div
          class="absolute top-0 z-50 hidden w-1/2 h-full overflow-hidden transition duration-500 ease-in-out transform-gpu overlay-container lg:block left-1/2"
        >
          <div
            class="relative h-full text-white transition duration-500 ease-in-out transform-gpu overlay"
          >
            <OverlayPanel
              class="overlay-left"
              :title-message="'Hello, friend!'"
              :header-message="'Already have an account? To keep connected with us, please log in.'"
              :button-message="'Log In Now'"
              :emit-boolean="false"
              :active.sync="rightpanelactive"
              @update:active="$formulate.reset('signup')"
            ></OverlayPanel>
            <div class="absolute mt-4 ml-2">
              <span>
                <router-link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-12 h-12 text-white fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.452 4.516c.446.436.481 1.043 0 1.576L8.705 10l3.747 3.908c.481.533.446 1.141 0 1.574-.445.436-1.197.408-1.615 0-.418-.406-4.502-4.695-4.502-4.695a1.095 1.095 0 0 1 0-1.576s4.084-4.287 4.502-4.695c.418-.409 1.17-.436 1.615 0z"
                    />
                  </svg>
                </router-link>
              </span>
            </div>
            <OverlayPanel
              class="overlay-right"
              :title-message="'Welcome back!'"
              :header-message="'Don\'t have an account yet? Register now and start your adventure with us!'"
              :button-message="'Sign Up Now'"
              :emit-boolean="true"
              :active.sync="rightpanelactive"
              @update:active="$formulate.reset('login')"
            ></OverlayPanel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '~/components/Auth/Login'
import Signup from '~/components/Auth/Signup'

export default {
  name: 'Auth',
  components: {
    Login,
    Signup,
  },
  beforeRouteLeave(to, from, next) {
    this.$formulate.reset('login')
    this.$formulate.reset('signup')
    next()
  },
  layout: 'authLayout',
  middleware({ app, redirect }) {
    if (app.$fire.auth.currentUser) {
      return redirect('/home')
    }
  },
  data() {
    return {
      auth: [
        { name: 'login', component: Login, class: 'sign-in-container' },
        { name: 'signup', component: Signup, class: 'sign-up-container' },
      ],
      rightpanelactive: false,
    }
  },
  mounted() {
    if (this.$route.params.auth === 'signup') {
      this.rightpanelactive = true
    }
  },
}
</script>

<style lang="postcss" scoped>
.sign-in-container::v-deep {
  left: 0;
  width: 100%;
  z-index: 2;
}

.sign-up-container::v-deep {
  left: 0;
  width: 100%;
  opacity: 1;
  z-index: 1;
}

@screen lg {
  .sign-in-container::v-deep,
  .sign-up-container::v-deep {
    @apply w-1/2;
  }

  .sign-up-container::v-deep {
    @apply opacity-0;
  }

  .wrapper-container.right-panel-active .sign-in-container::v-deep {
    @apply transform-gpu translate-x-full;
  }

  .wrapper-container.right-panel-active .sign-up-container::v-deep {
    @apply transform-gpu translate-x-full opacity-100 z-10;

    /* z-index: 5; */
  }
}

.wrapper-container.right-panel-active .overlay-container::v-deep {
  @apply transform-gpu -translate-x-full;
}

.wrapper-container.right-panel-active .overlay::v-deep {
  @apply transform-gpu translate-x-1/2;
}

.overlay::v-deep {
  background: #9b42da;
  background: linear-gradient(to right, #51509c, #9b42da);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  left: -100%;
  height: 100%;
  width: 200%;
  @apply transform-gpu translate-x-0;
}

.overlay-panel::v-deep {
  @apply transform-gpu translate-x-0;
}

.overlay-left::v-deep {
  @apply transform-gpu -translate-x-1/5;
}

.wrapper-container.right-panel-active .overlay-left::v-deep {
  @apply transform-gpu translate-x-0;
}

.overlay-right::v-deep {
  right: 0;
  @apply transform-gpu translate-x-0;
}

.wrapper-container.right-panel-active .overlay-right::v-deep {
  @apply transform-gpu translate-x-1/5;
}
</style>
