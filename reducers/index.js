import {USER_SIGNED_OUT, USER_SIGNED_IN} from '../actions'

export function user(state = null, action) {
  switch (action.type) {
    case USER_SIGNED_IN:
      {
        if (!action.user) {
          return state
        }
        return action.user
        break;
      }
    case USER_SIGNED_OUT:
      {
        return null
        break;
      }
    default:
      return state
  }
}
