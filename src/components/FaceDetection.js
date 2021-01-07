import React from 'react';
import './FaceDetection.css';
const FaceDetection = ({imageUrl, box}) => {
	
	const toAdd = (box) => {
		const array = [];
		Object.entries(box).map(([person,coords]) => {
		array.push( 
			<div className = "bounding_box" style ={{
				"top": coords.topRow, 
				"right": coords.rightCol, 
				"bottom": coords.bottomRow, 
				"left": coords.leftCol }}> 
			</div>
			);
	})
		return array;

	}
	// const toAdd = box.map(coords => { console.log(coords)});
	return (
		<div className= "center ma">
			<div className = "imagewrap">
				<img  id="inputImage" src = {imageUrl} alt = ""/>
				<div> {toAdd(box)} </div>				
			</div>
		</div>
		);
}
export default FaceDetection;