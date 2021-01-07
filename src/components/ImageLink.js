import React from 'react';
import './ImageLink.css';




const ImageLink = ({onInputChange, onPictureSubmit}) => {
	return (
		<div className = "imagelink">
			<p > Let us detect faces in your pictures. Try it now! </p>
			<div className = "search">
				<input type = "text" placeholder ="please insert image URL here..." onChange = {onInputChange} />
				<button  onClick = {onPictureSubmit}> Detect</button>
			</div>
		</div>

	)
}


export default ImageLink;