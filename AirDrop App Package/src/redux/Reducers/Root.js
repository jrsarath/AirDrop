import { SIGN_IN, GET_UPCOMING, GET_ONGOING, GET_WALLET } from '../Actions/Actions';
const initialState = {
  user: null,
  password: null,
  upcoming: [],
  ongoing: [],
  wallet: 0,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        user: action.payload.email,
        password: action.payload.password
      })
    case GET_UPCOMING:
      return Object.assign({}, state, {
        upcoming: action.payload
      })
    case GET_ONGOING:
      return Object.assign({}, state, {
        ongoing: action.payload
      })
    case GET_WALLET:
      return Object.assign({}, state, {
        wallet: action.payload
      })
    default:
      return state
  }
};
export default rootReducer;