import { createStore, combineReducers } from 'redux'
import OrderEvents from './actions/OrderEvents'
// const initialState = {
//   sidebarShow: true,
// }
// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }
const appReducer = combineReducers({
  OrderReducer: OrderEvents,
})

// const store = createStore(changeState)
const store = createStore(appReducer, undefined, undefined)

export default store
