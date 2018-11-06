import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
	constructor(props) {
		super(props);
		this.lastPersonRef = React.createRef();
		console.log('[Persons.js] Inside constructor', props);
	}

	componentWillMount() {
		console.log('[Persons.js] Inside componentWillMount');
	}

	componentDidMount() {
		console.log('[Persons.js] Inside componentDidMount');
		this.lastPersonRef.current.focus();
	}

	componentWillReceiveProps(nextProps) {
		console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
	// 	return nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked;
	// }

	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
	}

	componentDidUpdate() {
		console.log('[Persons.js] Inside componentDidUpdate');
	}

	render () {
		console.log('[Persons.js] Inside render');
		return this.props.persons.map((person, index) => <Person
				key={person.id}
				ref={this.lastPersonRef}
				position={index}
				name={person.name}
				age={person.age}
				click={() => this.props.clicked( index )}
				changed={( event ) => this.props.changed( event, person.id)}
			/>
		)
	}
}

export default Persons;
