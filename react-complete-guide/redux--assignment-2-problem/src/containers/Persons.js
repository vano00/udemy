import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
	render () {
		return (
			<div>
				<AddPerson personAdded={this.props.onAddPerson} />
				{this.props.prs.map(person => (
					<Person
						key={person.id}
						name={person.name}
						age={person.age}
						clicked={() => this.props.onDeletePerson(person.id)}/>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		prs: state.persons
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAddPerson: (name, age) => dispatch({type: actionTypes.ADD_PERSON, name: name, age: age}),
		onDeletePerson: (id) => dispatch({type: actionTypes.DELETE_PERSON, personElId: id}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
