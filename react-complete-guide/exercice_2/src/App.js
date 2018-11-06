import React, { Component } from 'react';

import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {

	state = {
		userInput: ''
	}

	inputChangeHandler = ( event ) => {
		this.setState({userInput: event.target.value})
	}

	deleteCharHandler = ( index ) => {
		const textArray = [...this.state.userInput];
		textArray.splice(index, 1);
		const updatedText = textArray.join('');
		this.setState({userInput: updatedText});
	}

	render() {

		const CharList = (
			this.state.userInput.split('').map((char, index) => {
				return (
					<Char
						char={char}
						key={index}
						clicked={() => this.deleteCharHandler(index)}
					/>
				)
			})
		)

		return (
			<div className="App">
				<input type="text" onChange={this.inputChangeHandler} value={this.state.userInput}/>
				<Validation inputLenght={this.state.userInput.length}/>
				{CharList}
			</div>
		);
	}
}

export default App;
