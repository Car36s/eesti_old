import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
//
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import mapApp from './store/reducers'

import registerServiceWorker from './registerServiceWorker'

// let store = createStore(mapApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//
// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('App')
// )


ReactDOM.render(
    <App />,
    document.getElementById('App')
)


// ReactDOM.render(<App />, document.getElementById('App'))
registerServiceWorker()
