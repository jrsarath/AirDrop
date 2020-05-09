import { SIGN_IN, GET_UPCOMING, GET_ONGOING, GET_WALLET, GET_TRANSACTIONS, ADD_NOTIFICATION, REMOVE_NOTIFICATION, GET_VERSION } from '../Actions/Actions';
import { State } from 'react-native-gesture-handler';
import config from '../../config/config';
const initialState = {
  user: null,
  userData: [],
  //password: null,
  upcoming: [],
  ongoing: [],
  wallet: 0,
  bonus: 0,
  transactions: [],
  notifications: [],
  new: 0,
  versionCode: config.version
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
        wallet: action.payload.wallet,
        bonus: action.payload.bonus
      })
    case GET_TRANSACTIONS:
      return Object.assign({}, state, {
        transactions: action.payload
      })
    case ADD_NOTIFICATION:
      return Object.assign({}, state, {
        notifications: state.notifications.concat(action.payload._body),
        new: state.new + 1
      })
    case REMOVE_NOTIFICATION:
      return Object.assign({}, state, {
        new: 0
      })
    case GET_VERSION:
      return Object.assign({}, state, {
        versionCode: action.payload
      })
    default:
      return state
  }
};
export default rootReducer;