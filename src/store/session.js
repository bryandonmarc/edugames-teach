// const some = require('lodash/some')
// const remove = require('lodash/remove')

const initialState = () => ({
  sessions: [],
})

export const state = () => initialState()

export const getters = {
  getSessions: (state) => state.sessions,
  getSessionById: (state) => (id) =>
    state.sessions.find((session) => session.id === id),
  getSessionIds: (state) => state.sessions.map(({ id }) => id),
}

export const mutations = {
  // RESET_STORE: (state) => {
  //   Object.assign(state, initialState())
  // },

  SET_SESSION: (state, session) => {
    // unique Array union to prevent duplicates
    // https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848
    // *DOESNT WORK WITH ARRAY OF OBJECTS*
    // use this instead: https://stackoverflow.com/a/48370618
    state.sessions = [...state.sessions, ...[session]].filter(
      ((set) => (o) => (set.has(o.id) ? false : set.add(o.id)))(new Set())
    )
  },

  REMOVE_SESSION: (state, sessionId) => {
    state.sessions = state.sessions.filter(
      (session) => session.id !== sessionId
    )
  },
}

export const actions = {
  async fetchSessions({ getters, commit, rootState: { login } }) {
    return await this.$fire.firestore
      .collection('teachers')
      .doc(login.authUser.email)
      .onSnapshot((snapshot) => {
        const snapshotSessions = snapshot.data().sessions
        const stateSessions = getters.getSessions

        // filter ids from stateSessions that are not in snapshotSessions
        const difference = stateSessions.filter(
          ({ id }) => !snapshotSessions.map(({ id }) => id).includes(id)
        )

        // remove items from stateSessions using the difference above
        difference.length &&
          difference.forEach(({ id }) => {
            commit('REMOVE_SESSION', id)
          })

        // commit all snapshotSessions not in stateSessions
        snapshotSessions
          .filter((session) => {
            if (stateSessions.length)
              return !getters.getSessionIds.includes(session.id)
            return true
          })
          .forEach(async (session) => {
            // commit('SET_SESSION', {
            //   id: session.id,
            //   ...(await session.get().then((doc) => {
            //     const data = doc.data()
            //     data.createdAt = data.createdAt.toDate()
            //     return data
            //   })),
            // })
            await session.get().then((doc) => {
              if (doc.exists) {
                const data = doc.data()
                data.createdAt = data.createdAt.toDate()
                commit('SET_SESSION', {
                  id: session.id,
                  ...data,
                })
              }
              // else {
              //   commit('REMOVE_SESSION', session.id)
              // }
            })
          })
      })
  },

  async createSession(
    { rootState: { login } },
    { className, topic, id, imgUrl }
  ) {
    const sessionDocument = this.$fire.firestore.collection('sessions').doc(id)
    await sessionDocument.get().then((doc) => {
      if (doc.exists) {
        throw new Error(
          'Classroom code already exists! Try generating a different one.'
        )
      }
    })
    return await sessionDocument
      .set({
        className,
        topic,
        imgUrl,
        activities: [],
        createdAt: this.$fireModule.firestore.Timestamp.now(),
      })
      .then(async () => {
        await this.$fire.firestore
          .collection('teachers')
          .doc(login.authUser.email)
          .update({
            sessions: this.$fireModule.firestore.FieldValue.arrayUnion(
              sessionDocument
            ),
          })
      })
      .catch(({ message }) => {
        throw message
      })
  },
}
