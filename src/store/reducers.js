import { SET_ACTIVE_MAP_PROPERTIES } from './actions'

const initalState = { activeMapProperties: null }

function mapApp(state = initalState, action) {
    switch(action.type) {
        case SET_ACTIVE_MAP_PROPERTIES:
            return Object.assign({}, state, {
                activeMapProperties: action.properties
            })
        default:
            return state
    }
}
export default mapApp
