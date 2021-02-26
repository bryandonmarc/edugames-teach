import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex-persist',
    paths: ['session.sessions', 'activity.activities'],
  })(store)
}
