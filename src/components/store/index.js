import { createStore, combineReducers } from "redux"
import kanban from './kanban/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const store = createStore(combineReducers({ kanban }),
composeWithDevTools())

export default store