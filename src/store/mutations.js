import * as types from './mutation_types'
export default {
  [types.CHANGE_CATEGORY](state,data){
    state.category = data
  }
}
