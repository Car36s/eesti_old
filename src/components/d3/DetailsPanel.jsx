import React, { Component } from 'react'

let flag = new Image()
let shield = new Image()

function getDetails(properties) {
	const { NAME_LOCAL, NAME_1, NAME_2, NAME_3 } = properties
	const { TYPE_1, TYPE_2, TYPE_3 } = properties

	const name = NAME_3 || NAME_2 || NAME_1 || NAME_LOCAL || ''
	const type = TYPE_3 || TYPE_2 || TYPE_1 || ''

	return ({ name, type })
}

class DetailsPanel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			type: '',
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.properties !== this.props.properties) {
			this.setState({ ...getDetails(nextProps.properties) }, (state) => {
				// eslint-disable-next-line
				console.log(this.state.name, this.state.type, state)
			})
		}
	}

	render() {
		const { name, type } = this.state

		return <div className="details-panel">
            <h1>DetailsPanel</h1>
            {name + ' ' + type.toLowerCase()}
            <DisplayImages name={name} type={type} />
        </div>
	}
}

const DisplayImages = (props) => {
	var umlauMapObj = {
		õ:'o',
		ä:'a',
		ö:'o',
		ü:'u'
	}

	const urlFriendlyName = props.name.toLowerCase().replace(/ö|ä|ü|õ/g, (match) => {
		return umlauMapObj[match]
	})

	const url_shield = '/img/' + props.type + '/shield/' + urlFriendlyName + '.png'
	const url_flag = '/img/' + props.type + '/flag/' + urlFriendlyName + '.png'

	shield.src = url_shield
	flag.src = url_flag

	// eslint-disable-next-line
	// shield.onload = () =>

	return <div className="images">
        <img src={url_shield} alt={props.name}/>
        <img src={url_flag} alt={props.name} />
    </div>
}

export default DetailsPanel
