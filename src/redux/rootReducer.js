import { combineReducers } from 'redux'

import { priceFilterReducer } from './reducers/priceFilterReducer'
import { transferFilterReducer } from './reducers/transferFilterReducer'
import { ticketsReducer } from './reducers/ticketsReducer'
import { statusReducer } from './reducers/statusReducer'

export const rootReducer = combineReducers({
  priceFilterReducer,
  transferFilterReducer,
  ticketsReducer,
  statusReducer,
})
