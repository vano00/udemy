import React from 'react';

import User from '../../components/User';

const authIndexPage = ( props ) => (
	<div>
		<h1>The Auth Index Page of {props.appName}</h1>
		<User name="Vano" age="38"/>
	</div>
);

authIndexPage.getInitialProps = (context) => {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({appName: "Super app (Auth)"});
		}, 1000);
	});
	return promise;
}

export default authIndexPage;
