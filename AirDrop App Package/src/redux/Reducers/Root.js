import { SIGN_IN, GET_UPCOMING, GET_ONGOING, GET_WALLET, GET_TRANSACTIONS } from '../Actions/Actions';
const initialState = {
  user: null,
  userData: [],
  //password: null,
  upcoming: [],
  ongoing: [],
  wallet: 0,
  transactions: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        user: action.payload.email,
        userData: action.payload.userData
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
    case GET_TRANSACTIONS:
      return Object.assign({}, state, {
        transactions: action.payload
      })
    default:
      return state
  }
};
export default rootReducer;