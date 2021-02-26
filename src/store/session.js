// const some = require('lodash/some')
// const remove = require('lodash/remove')

const initialState = () => ({
  sessions: [],
})

export const state = () => initialState()

export const getters = {
  getSessions: (state) =>
    state.sessions.slice().sort((a, b) => b.createdAt - a.createdAt),
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
  async fetchSessions({ getters, dispatch, commit, rootState: { login } }) {
    return await this.$fire.firestore
      .collection('sessions')
      .where('teacherId', '==', login.authUser.email)
      .onSnapshot(async (querySnapshot) => {
        const snapshotSessions = querySnapshot.docs
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

        const TO_BE_COMMITED = snapshotSessions.filter((session) => {
          if (stateSessions.length)
            return !getters.getSessionIds.includes(session.id)
          return true
        })

        // Parallel asynchronous
        await Promise.all(
          TO_BE_COMMITED.map(async (session) => {
            const { className, createdAt, imgUrl, topic } = await session.data()
            commit('SET_SESSION', {
              id: session.id,
              ...{
                className,
                createdAt: createdAt.toDate(),
                imgUrl,
                topic,
              },
            })
          })
        )

        await dispatch('activity/fetchActivities', null, { root: true })

        // querySnapshot.forEach(async (documentSnapshot) => {
        //   const snapshotSessions = documentSnapshot.data()

        //   // commit all snapshotSessions not in stateSessions

        // })
      })
    // .onSnapshot(async (snapshot) => {
    //   // const snapshotSessions = snapshot.data().sessions
    //   // const stateSessions = getters.getSessions

    //   // Sequential asynchronous
    //   // for await (const doc of TO_BE_COMMITED.map((session) =>
    //   //   session.get()
    //   // )) {
    //   //   if (doc.exists) {
    //   //     const { className, createdAt, imgUrl, topic } = doc.data()
    //   //     commit('SET_SESSION', {
    //   //       ...{
    //   //         className,
    //   //         createdAt: createdAt.toDate(),
    //   //         imgUrl,
    //   //         topic,
    //   //       },
    //   //       id: doc.id,
    //   //     })
    //   //   }
    //   // }

    // })
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
        teacherId: login.authUser.email,
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
