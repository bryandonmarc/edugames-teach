import tailwindcss from './tailwind.config'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'eduGames Teach',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Experience a new way of learning for your students using this teaching companion service featuring gamified learning with a fun, interactive educational game!',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/global.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-formulate.js', '~/plugins/persistedState.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    // https://google-fonts.nuxtjs.org
    '@nuxtjs/google-fonts',
    // https://firebase.nuxtjs.org/
    '@nuxtjs/firebase',
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    '@nuxtjs/toast',
  ],

  tailwindcss: {
    config: {
      ...tailwindcss,
    },
  },

  // https://github.com/nuxt-community/community-modules/tree/master/packages/toast#setup
  toast: {
    theme: 'bubble',
    position: 'top-right',
    duration: 5000,
    keepOnHover: true,
    action: {
      text: '🗙',
      onClick: (e, toastObject) => {
        toastObject.goAway(0)
      },
      class: 'action-white',
    },
  },

  // https://firebase.nuxtjs.org/guide/options/
  firebase: {
    config: {
      // REQUIRED: Official config for firebase.initializeApp(config):
      // https://console.firebase.google.com/project/monster-equation/settings/general/
      apiKey: process.env.API_KEY,
      authDomain: 'monster-equation.firebaseapp.com',
      databaseURL: '',
      projectId: 'monster-equation',
      storageBucket: 'monster-equation.appspot.com',
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
    onFirebaseHosting: true,
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: 'login/onAuthStateChanged',
        },
      },
      firestore: true,
      performance: true,
    },
  },

  // https://google-fonts.nuxtjs.org/options
  googleFonts: {
    families: {
      Montserrat: [400, 500, 600, 700, 900],
    },
    display: 'swap',
    prefetch: true,
    preload: true,
    download: true,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en',
  //   },
  // },

  // https://dev.to/kiritchoukc/deploy-nuxt-on-firebase-4ad8
  srcDir: 'src',
  // // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate/
  generate: {
    dir: 'public',
    // exclude: ['/home'],
  },

  // https://github.com/nuxt-community/firebase-module/issues/93#issuecomment-733627355
  hooks: {
    generate: {
      async before(generator) {
        const { default: firebase } = await import('firebase/app')

        await import('firebase/firestore')

        if (!firebase.apps.length) {
          firebase.initializeApp(generator.options.firebase.config)
        }

        generator.firebase = firebase.apps[0]
      },
      done(generator) {
        const config = require('./nuxt.config.js')

        generator.firebase
          .firestore()
          .terminate()
          .then(() => {
            if (config.dev)
              // eslint-disable-next-line no-console
              console.log('Firestore terminated')
          })
          // eslint-disable-next-line no-console
          .catch((error) => {
            if (config.dev)
              // eslint-disable-next-line no-console
              console.error(error.msg)
          })
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-dev/
  dev: process.env.NODE_ENV !== 'production',
}
