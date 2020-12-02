import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import Axios from 'axios';

const Login = (props) => {

	let [email, setEmail] = useState('')
	let [password, setPassword] = useState('')

	const handleLogin = () => {
		const data = JSON.stringify({"email": email , "password": password})
		console.log(data)
		Axios.post( '/login', {email, password} ).then( res => {
			localStorage.setItem("authToken", res.data.token)
			props.updateAuthState(true)
			props.history.push('/')
		} ).catch( err => {
			console.log(err)
		})
	}

    return (
        <Dialog open={true} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
			<TextField
				variant='outlined'
				value ={email}
				onChange = { (event) => setEmail(event.target.value) }
				id="name"
				label="Email"
				type="text"
				fullWidth
			/>
			<TextField
				variant='outlined'
				value ={password}
				onChange = { (event) => setPassword(event.target.value) }
				id="pass"
				label="Password"
				type="password"
				fullWidth
				style={{marginTop: '20px'}}
			/>
		</DialogContent>
		<DialogActions>
			<Button variant='contained' size='small' onClick={handleLogin} color="primary">
				Login
			</Button>
		</DialogActions>
      </Dialog>
    )
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateAuthState : (value) =>  dispatch({ type: 'UPDATEAUTH', value: value})
	}
}

export default connect(null, mapDispatchToProps)(Login)