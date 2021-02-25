// const initialState = () => ({
//   username: '',
// })

// export const state = () => initialState()

// export const mutations = {
//   SET_USERNAME: (state, value) => {
//     state.username = value
//   },
//   RESET_STORE: (state) => {
//     Object.assign(state, initialState())
//   },
// }

export const actions = {
  async registerTeacher({ commit }, { username, email, password }) {
    return await this.$fire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        return (await user.updateProfile({ displayName: username })) ?? user
      })
      .then(async (user) => {
        commit('login/SET_AUTH_DISPLAYNAME', username)
        return (await user.sendEmailVerification()) ?? user
      })
      .then(async ({ email, displayName }) => {
        await this.$fire.firestore.collection('teachers').doc(email).set({
          displayName,
        })
      })
      .catch(({ message }) => {
        throw message
      })
  },

  async registerStudent({ commit }, { username, email, password }) {
    return await this.$fire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        return (await user.updateProfile({ displayName: username })) ?? user
      })
      .then(async (user) => {
        return (await user.sendEmailVerification()) ?? user
      })
      .then(async ({ email, displayName }) => {
        await this.$fire.firestore.collection('students').doc(email).set({
          'display-name': displayName,
        })
      })
      .then(() => {
        commit('login/RESET_STORE')
      })
      .catch(({ message }) => {
        throw message
      })
  },
}
