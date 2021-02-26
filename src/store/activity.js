const initialState = () => ({
  activities: [],
})

export const state = () => initialState()

export const getters = {
  getActivities: (state) => state.activities,
  getActivitiesBySessionId: (state) => (id) =>
    state.activities
      .filter((activity) => activity.sessionId === id)
      .sort((a, b) => b.createdAt - a.createdAt),
  getActivitiesIds: (state) => state.activities.map(({ id }) => id),
}

export const mutations = {
  // RESET_STORE: (state) => {
  //   Object.assign(state, initialState())
  // },

  SET_ACTIVITY: (state, activity) => {
    state.activities = [...state.activities, ...[activity]].filter(
      ((set) => (o) => (set.has(o.id) ? false : set.add(o.id)))(new Set())
    )
  },

  REMOVE_ACTIVITY: (state, activityId) => {
    state.activities = state.activities.filter(
      (activity) => activity.id !== activityId
    )
  },
}

export const actions = {
  async fetchActivities({ commit, rootGetters, getters, dispatch }) {
    return await this.$fire.firestore
      .collection('activities')
      .where('sessionId', 'in', rootGetters['session/getSessionIds'])
      .onSnapshot(async (querySnapshot) => {
        const snapshotActivities = querySnapshot.docs
        const stateActivities = getters.getActivities

        // filter ids from stateActivities that are not in snapshotActivities
        const difference = stateActivities.filter(
          ({ id }) => !snapshotActivities.map(({ id }) => id).includes(id)
        )

        // remove items from stateActivities using the difference above
        difference.length &&
          difference.forEach(({ id }) => {
            commit('REMOVE_ACTIVITY', id)
          })

        const TO_BE_COMMITED = snapshotActivities.filter((session) => {
          if (stateActivities.length)
            return !getters.getActivitiesIds.includes(session.id)
          return true
        })

        // Parallel asynchronous
        await Promise.all(
          TO_BE_COMMITED.map(async (session) => {
            if (session.exists) {
              const {
                createdAt,
                startTime,
                endTime,
                ...rest
              } = await session.data()
              commit('SET_ACTIVITY', {
                id: session.id,
                ...{
                  createdAt: createdAt.toDate(),
                  startTime: startTime.toDate(),
                  endTime: endTime.toDate(),
                  ...rest,
                },
              })
            }
          })
        )

        await dispatch('question/fetchQuestions', null, { root: true })
      })
  },

  async createActivity(
    _,
    { sessionId, activityId, startTime, endTime, questions, ...rest }
  ) {
    const activityRef = this.$fire.firestore
      .collection('activities')
      .doc(activityId)

    return await activityRef
      .set({
        sessionId,
        createdAt: this.$fireModule.firestore.Timestamp.now(),
        startTime: this.$fireModule.firestore.Timestamp.fromDate(startTime),
        endTime: this.$fireModule.firestore.Timestamp.fromDate(endTime),
        ...rest,
      })
      .then(async () => {
        await questions.forEach(async (question) => {
          await activityRef.update({
            questions: this.$fireModule.firestore.FieldValue.arrayUnion(
              question
            ),
          })
        })
      })
      .then(async () => {
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
