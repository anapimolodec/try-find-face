import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import logo_ from './logo.png';

const Logo = () => {
	return (
		<div>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }}  >
				<div className="Tilt-inner"> 
					<img alt = "logo_" src = {logo_}/> 
				</div>
			</Tilt>
		</div>
	)
}

export default Logo;