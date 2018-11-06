import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import Aux from '../../../hoc/Aux';
import { AuthContext } from '../../../containers/App';

class Person extends Component {

	static propTypes = {
		name: PropTypes.string,
		age: PropTypes.number,
		click: PropTypes.func,
		changed: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.inputElement = React.createRef();
		console.log('[Person.js] Inside constructor', props);
	}

	componentWillMount() {
		console.log('[Person.js] Inside componentWillMount');
	}

	componentDidMount() {
		console.log('[Person.js] Inside componentDidMount');
	}

	focus() {
		this.inputElement.current.focus();
	}

	render () {
		console.log('[Person.js] Inside render');
		return (
			<Aux>
				<AuthContext.Consumer>
					{auth => auth ? <p>Im authenticated</p> : null}
				</AuthContext.Consumer>
				<p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age}</p>
				<p>{this.props.children}</p>
				<input
					ref={this.inputElement}
					type="text"
					onChange={this.props.changed}
					value={this.props.name}
				/>
			</Aux>
		)
	}
}

export default withClass(Person, classes.Person);
