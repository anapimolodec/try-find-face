import React from 'react';
import './Navigation.css';


const Navigation = ({onRouteChange, isSignedIn}) => {
	if (isSignedIn) {
		return (
			<nav>
				<p onClick = {() => onRouteChange('signin')}> Sign Out </p>
			</nav>);
	} else {
		return (
			<nav>
				<p onClick = {() => onRouteChange('signin')}> Sign In </p>
				<span style ={{width: "20px"}}> </span>
				<p  onClick = {() => onRouteChange('register')}> Register </p>
			</nav>
		)
	}	
}

export default Navigation;