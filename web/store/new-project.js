export const state = () => ({
  id: null,
  name: '',
  type: '',
})

export const mutations = {
  update(state, props) {
    const { ...next } = props
    Object.keys(next).forEach((key) => {
      state[key] = next[key]
    })
  },
}

export const actions = {
  update ({ commit }, props) {
    commit('update', props)
  }
}
