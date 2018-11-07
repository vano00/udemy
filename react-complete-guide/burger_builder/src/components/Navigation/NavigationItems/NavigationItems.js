import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => {
	let authLink = <NavigationItem link="/auth">Authentificate</NavigationItem>;
	if (props.isAuthenticated) {
		authLink = <NavigationItem link="/logout">Logout</NavigationItem>;
	}

	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/" exact>Burger Builder</NavigationItem>
			{props.isAuthenticated
			? <NavigationItem link="/orders">Orders</NavigationItem>
			: null}
			{authLink}
		</ul>
	)
}

export default navigationItems;
