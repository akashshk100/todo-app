import React, {Component} from 'react'
import Layout from './Components/Layout/Layout'
import Routes from './Components/routes/Routes'
import AddNoteModal from './Container/AddNoteModal/AddNoteModal'
import {connect} from 'react-redux'
 
class App extends Component{

	constructor(props){
		super(props)
		this.state = {
			addNoteModal: false
		}
	}

	componentDidMount(){
		if(localStorage.getItem('authToken')){
			this.props.updateAuthState(true)
		}
	}

	openAddNoteModal = () => {
		this.setState({
			addNoteModal: true
		})
	}

	render = () => {
		return(
			<div style={ {width: "70%", margin: "auto" } }>
				<AddNoteModal 
                    open={this.state.addNoteModal} 
                    handleClose={ () => { this.setState({ addNoteModal: false }) }} 
                    disabled={false}
                />
				<Layout openAddNoteModal={this.openAddNoteModal}>
					<Routes />
				</Layout>
			</div>
		)
	}
} 

const mapDispatchToProps = (dispatch) => {
	return {
		updateAuthState : (value) =>  dispatch({ type: 'UPDATEAUTH', value: value})
	}
}

export default connect(null, mapDispatchToProps)(App)
