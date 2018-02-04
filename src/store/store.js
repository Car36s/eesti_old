import { createStore } from 'redux'
import mapApp from './reducers'
let store = createStore(mapApp)


// import {setActiveMapProperties} from './actions'
console.log(store.getState())
