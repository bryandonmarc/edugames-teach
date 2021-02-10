// https://firebase.nuxtjs.org/tutorials/ssr
const config = require('../../nuxt.config')

const initialState = () => ({
  authUser: null,
  // code: '',
  // status: false,
})

export const state = () => initialState()

export const getters = {
  getAuthUser: (state) => state.authUser,
}

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  // SET_CODE(state, value) {
  //   state.code = value
  // },

  // SET_STATUS(state, value) {
  //   state.status = value
  // },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName,
    }
  },
}

export const actions = {
  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE')
      return
    }
    if (authUser && authUser.getIdToken) {
      if (config.dev) {
        try {
          const idToken = await authUser.getIdToken(true)
          // eslint-disable-next-line no-console
          console.info('idToken', idToken)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e)
        }
      }
    }
    commit('SET_AUTH_USER', { authUser })
  },

  // async findUser({ commit }, { email }) {
  //   return await this.$fire.auth
  //     .getUserByEmail(email)
  //     .then(() => {
  //       return true
  //     })
  //     .catch(({ code }) => {
  //       commit('SET_CODE', code)
  //       commit('SET_STATUS', false)
  //       return false
  //     })
  // },

  async getUser({ commit }, { email, password }) {
    return await this.$fire.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // commit('SET_STATUS', true)
        return true
      })
      .catch(({ code }) => {
        commit('RESET_STORE')
        throw code
      })
  },

  async logOut() {
    await this.$fire.auth
      .signOut()
      .then(() => {
        this.$toast.info('Successfully logged out!')
      })
      .catch(({ code }) => {
        this.$toast.error('An error occured. ' + code)
      })
  },
}
