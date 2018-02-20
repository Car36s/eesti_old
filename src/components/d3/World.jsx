import React, { Component } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'

import DetailsPanel from './DetailsPanel'

const MAPS = ['EST_adm0', 'EST_adm1', 'EST_adm2', 'EST_adm3']
// const MAP_LEVELS = ["eesti", "maakond", "vald", "alev"]

function getMapProjection(width, height) {
	const projection = d3.geoMercator()
		.center([25, 58.7])
		.translate([width / 2, height / 2])
		.scale(8500)

	return projection
}

class World extends Component {
	constructor(props) {
		super(props)

		this.state = {
			mapData: null,
			cities: {},
			activeMapProperties: {},
			projection: getMapProjection(1200, 800),
			hasActiveTile: false,

			map: {
				width: 1200,
				height: 800,
			}
		}

		this.generateMap = this.generateMap.bind(this)
		this.updateCitiesVisibility = this.updateCitiesVisibility.bind(this)
		this.setActiveTile = this.setActiveTile.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.mapDetailLevel !== nextProps.mapDetailLevel) {
			this.generateMap(nextProps.mapDetailLevel)
		}

		if(this.props.citiesVisibility !== nextProps.citiesVisibility) {
			this.updateCitiesVisibility('city', nextProps.citiesVisibility)
		}

		if(this.props.citiesLabelsVisibility !== nextProps.citiesLabelsVisibility) {
			this.updateCitiesVisibility('label', nextProps.citiesLabelsVisibility)
		}
		if(nextProps.activeTile.length && (this.props.activeTile !== nextProps.activeTile)) {
			this.setActiveTile(nextProps.activeTile)
		}
	}

	setActiveTile(activeTile) {
		const setActiveMapProperties = (properties) => {
			this.setState({ activeMapProperties: properties, hasActiveTile: true })
		}

		const selector = '.' + activeTile.toLowerCase()
		this.svg.selectAll('.eesti--active').classed('eesti--active', false)
		this.svg.selectAll(selector).classed('eesti--active', function(d) {
			setActiveMapProperties(d.properties)
			return true
		})
	}


	updateCitiesVisibility(type, visibility, properties = null) {
		const { cities, projection } = this.state
		switch(type) {
		case 'city':
			if(visibility) {
				this.svg.selectAll('.city-circle')
				.data(cities)
				.enter().append('circle')
				.attr('class', 'city-circle')
				.attr('r', d => {
					return Math.log(d.population) - 4
				})
				.attr('cx', function(d) {
					return projection([d.long, d.lat])[0]
				})
				.attr('cy', function(d) {
					return projection([d.long, d.lat])[1]
				})
				.on('mouseover', function (d) {
					d3.select(this)
				.classed('city-circle--active', true)
				.attr('r', function(d) {
					return Math.log(d.population)
				})
					setActiveMapProperties(d)
				})
				.on('mouseout', function () {
					d3.select(this)
					.classed('city-circle--active', false)
					.attr('r', function(d) {
						return Math.log(d.population) - 4
					})
				})

				if(this.props.citiesLabelsVisibility) {
					this.svg.selectAll('.city-label').classed('city-label--hidden', false)
				}
			} else {
				this.svg.selectAll('.city-circle').remove()

				if(this.props.citiesLabelsVisibility) {
					this.svg.selectAll('.city-label').classed('city-label--hidden', true)
				}
			}
			break
		case 'label':
			if(visibility) {
				this.svg.selectAll('.city-label')
				.data(cities)
				.enter().append('text')
				.attr('class', 'city-label')
				.attr('x', d => {
					return projection([d.long, d.lat])[0]
				})
				.attr('y', d => {
					return projection([d.long, d.lat])[1]
				})
				.text(d => { return d.NAME_LOCAL })
				.attr('dx', 7)
				.attr('dy', 6)
			} else {
				this.svg.selectAll('.city-label').remove()
			}
			break
		case 'update':
			this.svg.selectAll('.city-circle').raise()
			this.svg.selectAll('.city-label').raise()
			break
		case 'hover':
			if(!properties || !properties.HASC_1 || !visibility) return
			this.svg.selectAll('.city-circle')
			.data(cities.filter(city => properties.HASC_1.split('.').indexOf(city.parent) !== -1))
			.enter().append('circle')
			.attr('class', 'city-circle')
			.attr('r', d => {
				return Math.log(d.population) - 4
			})
			.attr('cx', function(d) {
				return projection([d.long, d.lat])[0]
			})
			.attr('cy', function(d) {
				return projection([d.long, d.lat])[1]
			})
			break
		default:
			console.warn('This shouldn\'t happen', type, visibility)
		}

		const setActiveMapProperties = (properties) => {
			this.setState({ activeMapProperties: properties })
		}

	}

	generateMap(mapDetailLevel = 0) {
		const { projection } = this.state

		const path = d3.geoPath().projection(projection)

		let eesti = topojson.feature(this.state.mapData, this.state.mapData.objects[MAPS[mapDetailLevel]]).features

		if(this.svg._groups[0][0].childElementCount) { this.svg.selectAll('.eesti').remove() }

		this.svg.selectAll('.eesti')
			.data(eesti)
			.enter().append('path')
			.attr('class', d => {
				const name = 'eesti ' + (d.properties.TYPE_3 || d.properties.TYPE_2 || d.properties.TYPE_1 || '').toLowerCase()
				return name
			})
			.attr('d', path)
			.on('mouseover', function(d) {
				if(mapDetailLevel > 0 && !(d.properties.ID_1 === 10 || d.properties.ID_2 === 182)) {
					resetActiveTile()
					d3.select(this).classed('eesti--active', true)
				}
				setActiveMapProperties(d.properties)
			})
			.on('mouseout', function() {
				d3.select(this).classed('eesti--active', false)
			})

		this.updateCitiesVisibility('update')

		const resetActiveTile = () => {
			if(this.state.hasActiveTile) {
				this.svg.selectAll('.eesti--active').classed('eesti--active', false)
				this.setState({ hasActiveTile: false })
			}
		}

		const setActiveMapProperties = (properties) => {
			this.setState({ activeMapProperties: properties },
			() => this.updateCitiesVisibility('hover', true, properties ))
		}
	}

	componentDidMount() {
		this.svg = d3.select('#map')
			.append('svg')
			.attr('width', this.state.map.width)
			.attr('height', this.state.map.height)
			.append('g')

		d3.queue()
			.defer(d3.json, './data/eesti.json')
			.defer(d3.csv, './data/linnad.csv')
			.await((error, mapData, cities) => {
				if(error) {
					console.warn(error)
				} else {
					this.setState({
						mapData,
						cities
					}, () => this.generateMap())
				}
			})
	}

	render() {
		return <div id="map" className="map">
			<DetailsPanel properties={this.state.activeMapProperties} />
		</div>
	}
}
export default World
