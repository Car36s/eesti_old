import React, { Component } from 'react'
import World from './d3/World'
import Controls from './d3/Controls'

class Content extends Component {
	constructor(props) {
		super(props)

		this.state = {
			mapDetailLevel: 0,
			activeTile: '',
			citiesVisibility: false,
			citiesLabelsVisibility: false,
		}

		this.setMapDetailLevel = this.setMapDetailLevel.bind(this)
		this.toggleCitiesVisibility = this.toggleCitiesVisibility.bind(this)
		this.toggleCitiesLabelsVisibility = this.toggleCitiesLabelsVisibility.bind(this)
		this.setActiveTile = this.setActiveTile.bind(this)
	}

	setMapDetailLevel(level) {
		this.setState({ mapDetailLevel: level })
	}

	toggleCitiesVisibility() {
		this.setState({ citiesVisibility: !this.state.citiesVisibility })
	}
	toggleCitiesLabelsVisibility() {
		this.setState({ citiesLabelsVisibility: !this.state.citiesLabelsVisibility })
	}
	setActiveTile(activeTile) {
		this.setState({ activeTile })
	}

	render() {
		const { activeTile, mapDetailLevel, citiesVisibility, citiesLabelsVisibility } = this.state
		return (
            <div className="content">
                <Controls
                    mapDetailLevel={mapDetailLevel}
                    setMapDetailLevel={this.setMapDetailLevel}
                    toggleCitiesLabelsVisibility={this.toggleCitiesLabelsVisibility}
                    toggleCitiesVisibility={this.toggleCitiesVisibility}
                    citiesLabelsVisibility={citiesLabelsVisibility}
                    citiesVisibility={citiesVisibility}
                    setActiveTile={this.setActiveTile}
                    />
                <World
                    mapDetailLevel={mapDetailLevel}
                    citiesVisibility={citiesVisibility}
                    citiesLabelsVisibility={citiesLabelsVisibility}
                    activeTile={activeTile}
                    />
            </div>
		)
	}
}

export default Content
