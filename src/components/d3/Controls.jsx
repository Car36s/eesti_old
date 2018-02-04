import React, { Component } from 'react'

class Controls extends Component {
	constructor(props){
		super(props)

		this.onSelectLevel = this.onSelectLevel.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSelectLevel(e) {
		this.props.setMapDetailLevel(e.target.value)
	}

	onSubmit(e) {
		if(e.keyCode === 13) {
			this.props.setActiveTile(e.target.value)
			e.target.value = ''
		}
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.mapDetailLevel !== nextProps.mapDetailLevel) {
			this.refs.mapDetailLevelSelect.value = nextProps.mapDetailLevel
		}
	}

	render() {

		const { citiesVisibility, citiesLabelsVisibility } = this.props

		const cityButtonLabel = citiesVisibility ? 'Peida linnad' : 'Näita linnad'
		const cityLabelButtonLabel = citiesLabelsVisibility ? 'Peida nimed' : 'Linnade nimed'

		return <div className="controls">
            <button type="button" onClick={() => this.props.setMapDetailLevel(0)}> Eesti </button>
            <button type="button" onClick={() => this.props.setMapDetailLevel(1)}> Maakonnad </button>
            <button type="button" onClick={() => this.props.setMapDetailLevel(2)}> Vallad </button>
            <button type="button" onClick={() => this.props.setMapDetailLevel(3)}> Külad </button>

            <select ref="mapDetailLevelSelect" onChange={this.onSelectLevel}>
                <option value="0">Kogu Eesti</option>
                <option value="1">Maakonnad</option>
                <option value="2">Vallad</option>
                <option value="3">Külad</option>
            </select>

            <button type="button" onClick={this.props.toggleCitiesVisibility}>{cityButtonLabel}</button>
            { citiesVisibility && <button type="button" onClick={this.props.toggleCitiesLabelsVisibility}>{cityLabelButtonLabel}</button> }

            <input type="text" placeholder="sisesta linn/maakond/alev" onKeyDown={this.onSubmit} />
        </div>
	}
}

export default Controls
