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
  async createUser({ commit }, { username, email, password }) {
    return await this.$fire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // commit('SET_USERNAME', username)
        const user = this.$fire.auth.currentUser
        return user
          .updateProfile({ displayName: username })
          .then(() => {
            return user
              .sendEmailVerification()
              .then(() => {
                return this.$fire.firestore
                  .collection('teachers')
                  .doc(email)
                  .set({
                    displayName: username,
                  })
                  .then(() => {
                    return true
                  })
                  .catch(({ code }) => {
                    throw code
                  })
              })
              .catch(({ code }) => {
                throw code
              })
          })
          .catch(({ code }) => {
            throw code
          })
      })
      .catch(({ code }) => {
        throw code
      })
  },
}
