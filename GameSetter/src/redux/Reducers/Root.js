import { SIGN_IN, GET_UPCOMING, GET_ONGOING } from '../Actions/Actions';
const initialState = {
  user: null,
  upcoming: [],
  ongoing: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        user: action.payload
      })
    case GET_UPCOMING:
      return Object.assign({}, state, {
        upcoming: action.payload
      })
    case GET_ONGOING:
      return Object.assign({}, state, {
        ongoing: action.payload
      })
    default:
      return state
  }
};
export default rootReducer;