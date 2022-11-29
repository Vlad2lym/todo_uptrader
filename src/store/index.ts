import {createStore} from 'redux'
import { projectReducer } from './projectReducer'

export const store = createStore(projectReducer)