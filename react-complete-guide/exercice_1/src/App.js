import React, { Component } from 'react';

import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import './App.css';

class App extends Component {

	state = {
		username: 'Yvan'
	}

	usernameChangeHandler = (event) => {
		this.setState({username: event.target.value});
	}

	render() {
		return (
			<div className="App">
				<UserInput
					currentName={this.state.username}
					changed={this.usernameChangeHandler}
				/>
				<UserOutput
					userName={this.state.username}
				/>
				<UserOutput/>
				<UserOutput/>
			</div>
		);
 	}
}

export default App;
