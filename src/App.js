import React, { Component } from 'react'

import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

import './style/reset.css'
import './style/style.scss'


class App extends Component {
	render() {
		return (
            <div className="app">
                <Header />
                <Content />
                <Footer />
            </div>
		)
	}
}

export default App
