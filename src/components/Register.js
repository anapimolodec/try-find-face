import React  from 'react';
import './Register.css';

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}

	onSubmitRegister = () => {
		fetch('https://try-find-face-server.herokuapp.com/register',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(res => res.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
			
				}
			})
	}
	render() {

		return (
			<div className="register">
				<div className = "form">
					<h1> Join! </h1>
					<div className = "input_form">
						<h2> Name: </h2> 
						<input placeholder = "your name.." type = "text" onChange= {this.onNameChange} /> 
					</div>
					<div className = "input_form">
						<h2> Email: </h2> 
						<input placeholder = "your email.." type = "email" onChange= {this.onEmailChange}/> 
					</div>
					<div className = "input_form">
						<h2> Password:  </h2>
						<input placeholder = "your password.." type = "password" onChange= {this.onPasswordChange}/>
					</div>
					<div className= "buttons">
						<button className = "ma2" onClick = {this.onSubmitRegister}> Register </button>
					</div>
				</div>
			</div>
		);
	}
}




export default Register;