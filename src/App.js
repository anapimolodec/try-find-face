import React, {Component} from 'react';


import Navigation from './components/Navigation.js';
import Logo from './components/Logo.js';
import ImageLink from './components/ImageLink.js';
import Signin from './components/Signin.js';
import Register from './components/Register.js';
import Rank from './components/Rank.js';
import Particles from 'react-particles-js';
import FaceDetection from './components/FaceDetection.js';
import './App.css';



const particleOptions = {
	particles: {
	        number: {
	            value: 150,
	            density: {
	            	enable:true,
	            	value_area: 800
	            }
	        },
	        size: {
	            value: 2
	        }
	    },
	    interactivity: {
	        events: {
	            onhover: {
	                enable: true,
	                mode: "repulse"
	            }
	        }
		}	
}

const initialState = {
			input : '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			user: 
			{
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
}
class App extends Component {

	constructor() {
		super();
		this.state = {
			input : '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false,
			user: 
			{
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}
	}
	

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
	}
	calculateFaceLocation = (data) => {
		const faces = data.outputs[0].data.regions
		let faces_coords = [];
		for (let face of faces) {
			const clarifaiFace = face.region_info.bounding_box;
			const image = document.getElementById('inputImage');
			const width = Number(image.width)
			const height = Number(image.height)
			
			faces_coords.push({
				leftCol : clarifaiFace.left_col* width,
				topRow : clarifaiFace.top_row * height,
				rightCol :width - (clarifaiFace.right_col * width),
				bottomRow: height - (clarifaiFace.bottom_row * height)
			})

		}
		console.log(faces_coords)
		return faces_coords;
	}

	displayFaceBox = (boxes) => {
		this.setState({box: boxes});
		
	}
	onInputChange = (event) => {
		//change input value by writing on input section
		this.setState({input: event.target.value});
	}

	onPictureSubmit = () => {
		//submit written url to input state value
		this.setState({imageUrl:this.state.input})
		//run Clarifai Face Detection Model
		fetch('https://try-find-face-server.herokuapp.com/imageurl', {
					method: 'post',
					headers: {'Content-Type' : 'application/json'},
					body: JSON.stringify({
						input: this.state.input
						})
				})
			.then(res => res.json())
			.then(res => {
				fetch('https://try-find-face-server.herokuapp.com/image', {
					method: 'put',
					headers: {'Content-Type' : 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
						})
					})
					.then(res => res.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, {entries: count}))
					})
					.catch(err => console.log(err))
				this.displayFaceBox(this.calculateFaceLocation(res))
					
				})

			//get bounding box coordinates and pass them to CalculateFaceLocation
			//use coords to setState for box
			.catch(err => console.log(err))
	}

	onRouteChange = (route) => {
		if (route === "home") {
			this.setState({isSignedIn: true})
		} else {
			this.setState(initialState)

		}
		this.setState({route: route});
	}



	render() {
		  return (
		    <div className="App">
		      	<Particles className = "particles" params = {particleOptions}/>
		      	<Navigation onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn}/>
		      	{
		      	this.state.route === 'home' 
		      		? 	
		      			<>
			  	  <Logo /> 
			      <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
			      <ImageLink onInputChange = {this.onInputChange} onPictureSubmit = {this.onPictureSubmit}/> 
			      <FaceDetection box= {this.state.box} imageUrl = {this.state.imageUrl}/>
		        		</> 
		      		: 
		      			(this.state.route === "register" ? <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/> : <Signin loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>) 
		  		}
		    </div>
		  );
	}
}

export default App;
