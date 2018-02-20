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
			highlightCitiesOnHover: false,
		}

		this.setMapDetailLevel = this.setMapDetailLevel.bind(this)
		this.toggleCitiesVisibility = this.toggleCitiesVisibility.bind(this)
		this.toggleCitiesLabelsVisibility = this.toggleCitiesLabelsVisibility.bind(this)
		this.setActiveTile = this.setActiveTile.bind(this)
		this.onToggleHighLightCities = this.onToggleHighLightCities.bind(this)
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
	onToggleHighLightCities() {
		this.setState({ highlightCitiesOnHover: !this.state.highlightCitiesOnHover })
	}

	render() {
		const {
			activeTile,
			mapDetailLevel,
			citiesVisibility,
			citiesLabelsVisibility,
			highlightCitiesOnHover,
		} = this.state

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
					highlightCitiesOnHover={highlightCitiesOnHover}
					onToggleHighLightCities={this.onToggleHighLightCities}
                    />
                <World
                    mapDetailLevel={mapDetailLevel}
                    citiesVisibility={citiesVisibility}
                    citiesLabelsVisibility={citiesLabelsVisibility}
                    activeTile={activeTile}
					highlightCitiesOnHover={highlightCitiesOnHover}
                    />
            </div>
		)
	}
}

export default Content
