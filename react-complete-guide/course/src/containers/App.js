import React, { PureComponent } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

	constructor(props) {
		super(props);
		console.log('[App.js] Inside constructor', props);
	}

	componentWillMount() {
		console.log('[App.js] Inside componentWillMount');
	}

	componentDidMount() {
		console.log('[App.js] Inside componentDidMount');
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
	// 	return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons;
	// }

	componentWillUpdate(nextProps, nextState) {
		console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('[UPDATE App.js] Inside getDerivedStateFromProps', nextProps, prevState);
		return prevState;
	}

	getSnapshotBeforeUpdate() {
		console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate');
	}

	componentDidUpdate() {
		console.log('[App.js] Inside componentDidUpdate');
	}

	state = {
		persons: [
			{id: 0, name: 'Yvan', age:38},
			{id: 1, name: 'Catherine', age:34},
			{id: 2, name: 'Aimy', age:1},
		],
		showPersons: false,
		toggleClicked: 0,
		authenticated: false
	}

	deletePersonHandler = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons});
	}

	nameChangeHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id
		})

		const person = {...this.state.persons[personIndex]}
		person.name = event.target.value;
		const persons = [...this.state.persons];
		persons[personIndex] = person;
		this.setState({persons: persons});
	}

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState((prevState) => ({
			showPersons: !doesShow,
			toggleClicked: prevState.toggleClicked + 1
		}));
	}

	loginHandler = () => {
		this.setState({authenticated: true})
	}

	render() {
		console.log('[App.js] Inside render');

		let persons = null;

		if (this.state.showPersons) {
			persons = <Persons
						persons={this.state.persons}
						clicked={this.deletePersonHandler}
						changed={this.nameChangeHandler}/>
		}

		return (
			<Aux>
				<button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
				<Cockpit
					appTitle={this.props.title}
					clicked={this.togglePersonsHandler}
					persons={this.state.persons}
					showPersons={this.state.showPersons}
					login={this.loginHandler}
				/>
			<AuthContext.Provider value={this.state.authenticated}>
					{persons}
				</AuthContext.Provider>
			</Aux>
		);
 	}
}

export default withClass(App, classes.App);
