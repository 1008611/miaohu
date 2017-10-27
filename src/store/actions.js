import * as types from './mutation_types'

export default {
  changecategory: ({commit}, data) => {
    commit(types.CHANGE_CATEGORY, data)
  }
}
