const initialState = () => ({
  questions: [],
})

export const state = () => initialState()

export const getters = {
  getQuestions: (state) => state.questions,
  getQuestionsBySessionId: (state) => (id) =>
    state.questions.filter((question) => question.activityId === id),
  getQuestionsIds: (state) => state.questions.map(({ id }) => id),
}

export const mutations = {
  // RESET_STORE: (state) => {
  //   Object.assign(state, initialState())
  // },

  SET_QUESTION: (state, question) => {
    state.questions = [...state.questions, ...[question]].filter(
      ((set) => (o) => (set.has(o.id) ? false : set.add(o.id)))(new Set())
    )
  },

  REMOVE_QUESTION: (state, questionId) => {
    state.questions = state.questions.filter(
      (activity) => activity.id !== questionId
    )
  },
}

export const actions = {
  async fetchQuestions({ commit, rootGetters, getters }) {
    return await this.$fire.firestore
      .collection('questions')
      .where('activityId', 'in', rootGetters['activity/getActivitiesIds'])
      .onSnapshot(async (querySnapshot) => {
        const snapshotQuestions = querySnapshot.docs
        const stateQuestions = getters.getQuestions

        // filter ids from stateQuestions that are not in snapshotQuestions
        const difference = stateQuestions.filter(
          ({ id }) => !snapshotQuestions.map(({ id }) => id).includes(id)
        )

        // remove items from stateQuestions using the difference above
        difference.length &&
          difference.forEach(({ id }) => {
            commit('REMOVE_QUESTION', id)
          })

        const TO_BE_COMMITED = snapshotQuestions.filter((activity) => {
          if (stateQuestions.length)
            return !getters.getQuestionsIds.includes(activity.id)
          return true
        })

        // Parallel asynchronous
        await Promise.all(
          TO_BE_COMMITED.map(async (activity) => {
            if (activity.exists) {
              commit('SET_QUESTION', {
                id: activity.id,
                ...(await activity.data()),
              })
            }
          })
        )
      })
  },

  async createActivityWithQuestions(
    { dispatch },
    { activityId, questions, ...rest }
  ) {
    const activityDocument = this.$fire.firestore
      .collection('activities')
      .doc(activityId)
    await activityDocument.get().then((doc) => {
      if (doc.exists) {
        throw new Error(
          'Activity code already exists! Try generating a different one.'
        )
      }
    })

    const questionRefs = []
    questions.forEach(async (question) => {
      await this.$fire.firestore
        .collection('questions')
        .add({ activityId, ...question })
        .then((questionRef) => {
          questionRefs.push(questionRef)
        })
    })

    // console.log('questionRefs')
    // console.log(questionRefs)
    // console.log('activity/createActivity')
    // console.log({
    //   activityId,
    //   questions: questionRefs,
    //   ...rest,
    // })

    await dispatch(
      'activity/createActivity',
      {
        activityId,
        questions: questionRefs,
        ...rest,
      },
      { root: true }
    )

    // await Promise.all(
    //   questions.map(async (question) => {
    //     await this.$fire.firestore
    //       .collection('questions')
    //       .add(question)
    //       .then((questionRef) => {
    //         return questionRef
    //       })
    //   })
    // ).then(async (questionsRefs) => {
    //   console.log('questionsRefs')
    //   console.log(questionsRefs)
    //   console.log('activity/createActivity')
    //   console.log({
    //     activityId,
    //     questions: questionsRefs,
    //     ...rest,
    //   })
    //   await dispatch(
    //     'activity/createActivity',
    //     {
    //       activityId,
    //       questions: questionsRefs,
    //       ...rest,
    //     },
    //     { root: true }
    //   )
    // })

    // questions.forEach(async (question) => {
    //   await this.$fire.firestore
    //     .collection('questions')
    //     .add(question)
    //     .then((questionRef) => {
    //       questionsRefs.push(questionRef)
    //     })
    // })
    // return await dispatch(
    //   'activity/createActivity',
    //   {
    //     sessionId,
    //     activityId,
    //     startTime,
    //     endTime,
    //     questions: questionsRefs,
    //   },
    //   { root: true }
    // )
  },
}
