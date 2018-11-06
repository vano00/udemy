import React from 'react';

const userOutput = (props) => {

	const style = {
		width: '200px',
		padding: '10px',
		border: '1px solid #eee',
		margin: '10px auto'
	}

	return (
		<div style={style}>
			<p>Salut</p>
			<p>{props.userName}</p>
		</div>
	)
}

export default userOutput;
