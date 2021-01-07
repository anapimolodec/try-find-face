import React  from 'react';
import './Signin.css';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail : "",
			signInPassword: ""
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('https://try-find-face-server.herokuapp.com/signin',{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(res => res.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user)
					this.props.onRouteChange("home")
				}
			})
		
	}


	render() {
		const {onRouteChange} = this.props;
		return (
		<div >
			<div className = "form">
				<h1> Sign in </h1>
				<div className = "input_form">
					<h2> Email: </h2> 
					<input placeholder = "your email.." type = "text" className="f5 ma3" onChange = {this.onEmailChange}/> 
				</div>
				<div className = "input_form">
					<h2> Password: </h2>
					<input placeholder = "your password.." type = "password" className="f5 ma3" onChange = {this.onPasswordChange}/> 
				</div>
				<div className= "buttons">
					<button className = "ma2" onClick = {this.onSubmitSignIn }> Sign In </button>
					<button  className = "ma2" id = "register" onClick={() => onRouteChange("register")}> Register </button>
				</div>
			</div>
		</div>
		)
	}
}



export default Signin;