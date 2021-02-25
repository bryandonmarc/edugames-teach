// const some = require('lodash/some')
// const convertTimestampToDate = (data) => {
//   data.date = data.date.toDate()
//   return data
// }

// const initialState = () => ({
//   activities: [],
// })

// export const state = () => initialState()

export const getters = {
  getActivitiesById: (rootGetters) => (id) =>
    rootGetters['session/getSessionById'](id).activities,
  getActivitiesIds: (rootGetters) => (id) =>
    rootGetters['session/getSessionById'](id).activities.map(({ id }) => id),
}

export const mutations = {
  // RESET_STORE: (state) => {
  //   Object.assign(state, initialState())
  // },

  SET_ACTIVITY: (rootState, activity) => {
    rootState.session.sessions.activities = [
      ...rootState.session.sessions.activities,
      ...[activity],
    ].filter(
      ((set) => (o) => (set.has(o.id) ? false : set.add(o.id)))(new Set())
    )
  },

  REMOVE_ACTIVITY: (rootState, activityId) => {
    rootState.session.sessions.activities = rootState.session.sessions.activities.filter(
      (activity) => activity.id !== activityId
    )
  },
}

export const actions = {
  async fetchActivities({ commit, rootGetters, getters }) {
    return await this.$fire.firestore
      .collection('sessions')
      .where(
        this.$fireModule.firestore.FieldPath.documentId(),
        'in',
        rootGetters['session/getSessionIds']
      )
      .onSnapshot((snapshot) => {
        const snapshotActivities = snapshot.data().activities
        const stateActivities = getters.getActivitiesById(snapshot.id)

        // filter ids from stateActivities that are not in snapshotActivities
        const difference = stateActivities.filter(
          ({ id }) => !snapshotActivities.map(({ id }) => id).includes(id)
        )

        // remove items from stateActivities using the difference above
        difference.length &&
          difference.forEach(({ id }) => {
            commit('REMOVE_ACTIVITY', id)
          })

        // commit all snapshotActivities not in stateActivities
        snapshotActivities
          .filter((activity) => {
            if (stateActivities.length)
              return !getters
                .getActivitiesIds(snapshot.id)
                .includes(activity.id)
            return true
          })
          .forEach(async (activity) => {
            await activity.get().then((doc) => {
              if (doc.exists) {
                const data = doc.data()
                data.createdAt = data.createdAt.toDate()
                data.startTime = data.startTime.toDate()
                data.endTime = data.endTime.toDate()
                commit('SET_ACTIVITY', {
                  id: activity.id,
                  ...data,
                })
              }
            })
          })
      })
  },

  async createActivity(_, { sessionId, startTime, endTime, questions }) {
    return await this.$fire.firestore
      .collection('activities')
      .add({
        createdAt: this.$fireModule.firestore.Timestamp.now(),
        startTime: this.$fireModule.firestore.Timestamp.fromDate(startTime),
        endTime: this.$fireModule.firestore.Timestamp.fromDate(endTime),
        questions,
      })
      .then(async (activityRef) => {
        await this.$fire.firestore
          .collection('sessions')
          .doc(sessionId)
          .update({
            activities: this.$fireModule.firestore.FieldValue.arrayUnion(
              activityRef
            ),
          })
      })
      .catch(({ message }) => {
        throw message
      })
  },
}
